import { useEffect, useRef, useState, ChangeEvent } from "react";
import { Map, MapBrowserEvent, View } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style, Text } from "ol/style";
import { FeatureLike } from "ol/Feature.js";
import {
  FullScreen,
  defaults as defaultControls,
  ScaleLine,
  ZoomSlider,
  OverviewMap,
} from "ol/control.js";
import { fromLonLat } from "ol/proj.js";
import { AnimationOptions } from "ol/View.js";
import { Units } from "ol/control/ScaleLine.js";
import { Draw, Modify, Snap } from "ol/interaction.js";

import Legend from "./Legend.js";
import Header from "./Header.js";

import "ol/ol.css";

import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

interface FeatureProperties {
  name: string;
  density: number;
}

interface FeatureGeometry {
  type: "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][][][];
}

interface GeoJsonFeature {
  type: "Feature";
  id: string;
  properties: FeatureProperties;
  geometry: FeatureGeometry;
}

interface GeoJsonData {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}

const newYork = fromLonLat([-73.935242, 40.73061]);

const elastic = (t: number) => {
  return (
    Math.pow(2, -10 * t) * Math.sin(((t - 0.075) * (2 * Math.PI)) / 0.3) + 1
  );
};

const MapComponent: React.FC = () => {
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonData | null>(null);
  const [filteredGeoJsonData, setFilteredGeoJsonData] =
    useState<GeoJsonData | null>(null);
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
  const [popoverContent, setPopoverContent] =
    useState<FeatureProperties | null>(null);

  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const [scaleLineUnit, setScaleLineUnit] = useState<Units | undefined>(
    "metric"
  );

  const [currentGeometry, setCurrentGeometry] = useState<string>("None");

  const [isZoomScaledOn, setIsZoomScaledOn] = useState<boolean>(false);
  const [isoverViewMapOn, setIsOverViewMapOn] = useState<boolean>(false);
  const [showLegend, setShowLegend] = useState<boolean>(true);

  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const viewRef = useRef<View | null>(null);
  const mapRef = useRef<Map | undefined>(undefined);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch(
        "https://openlayers.org/data/vector/us-states.json"
      );
      const data: GeoJsonData = await res.json();
      setGeoJsonData(data);
      setFilteredGeoJsonData(data);
    };

    fetchApi();
  }, []);

  const getColorForDensity = (density: number): string => {
    // Define a color scale based on density
    if (density > 200) return "#13202D";
    if (density > 100) return "#14293D";
    if (density > 50) return "#16304D";
    if (density > 20) return "#1D365C";
    if (density > 10) return "#243A6B";
    if (density > 5) return "#2A417B";
    return "#2B448C";
  };

  useEffect(() => {
    if (geoJsonData) {
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(filteredGeoJsonData, {
          featureProjection: "EPSG:3857",
        }),
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: (feature: FeatureLike) => {
          const density = feature.get("density");
          const color = getColorForDensity(density);

          // Style for the polygon
          const style = new Style({
            fill: new Fill({
              color: color,
            }),
            stroke: new Stroke({
              color: "#000",
              width: 0.5,
            }),
          });

          // Text style for the state name
          const text = feature.get("name");
          if (text) {
            style.setText(
              new Text({
                text: text,
                font: "12px Calibri,sans-serif",
                fill: new Fill({ color: "#fff" }),
                offsetX: 0,
                offsetY: -10,
                textAlign: "center",
                textBaseline: "middle",
              })
            );
          }

          return style;
        },
      });

      const drawSource = new VectorSource();
      const drawVector = new VectorLayer({
        source: drawSource,
        style: {
          "fill-color": "rgba(255, 255, 255, 0.2)",
          "stroke-color": "#ffcc33",
          "stroke-width": 2,
          "circle-radius": 7,
          "circle-fill-color": "#ffcc33",
        },
      });

      const view = new View({
        center: [-11542437.750890903, 4862581.061116328],
        zoom: 4,
      });

      viewRef.current = view;

      const overviewMapControl = new OverviewMap({
        className: "ol-overviewmap ol-custom-overviewmap",
        layers: [
          new TileLayer({
            source: new OSM({
              url:
                "https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png" +
                "?apikey=07fc353cad414368a54104c13b3a84ab",
            }),
          }),
        ],
        collapseLabel: "\u00BB",
        label: "\u00AB",
        collapsed: false,
      });

      const map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
          drawVector,
        ],
        view: view,
        controls: defaultControls().extend([
          new FullScreen(),
          new ScaleLine({ units: scaleLineUnit }),
        ]),
      });

      mapRef.current = map;

      map.on("loadstart", function () {
        map.getTargetElement().classList.add("spinner");
      });
      map.on("loadend", function () {
        map.getTargetElement().classList.remove("spinner");
      });

      const modify = new Modify({ source: drawSource });
      map.addInteraction(modify);

      let draw, snap;

      const addInteractions = () => {
        if (currentGeometry !== "None") {
          draw = new Draw({
            source: drawSource,
            type: currentGeometry,
          });
          snap = new Snap({ source: drawSource });

          map.addInteraction(draw);
          map.addInteraction(snap);
        }
      };

      addInteractions();

      if (isZoomScaledOn) {
        map.addControl(new ZoomSlider());
      }

      if (isoverViewMapOn) {
        map.addControl(overviewMapControl);
      }

      const handleHover = (event: MapBrowserEvent<PointerEvent>) => {
        const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => {
          return feature;
        });

        if (feature) {
          const properties = feature.getProperties();
          const coordinates = event.coordinate;

          if (properties) {
            const content: FeatureProperties = {
              name: properties.name,
              density: properties.density,
            };

            setPopoverContent(content);
          }

          setPopoverVisible(true);

          if (popoverRef.current) {
            const pixel = map.getPixelFromCoordinate(coordinates);
            const left = pixel[0] - 48 + "px";
            const top = pixel[1] - 75 + "px";

            popoverRef.current.style.left = left;
            popoverRef.current.style.top = top;
          }
        } else {
          setPopoverVisible(false);
        }
      };

      if (currentGeometry === "None") {
        map.on("pointermove", handleHover);
      }

      return () => {
        map.un("pointermove", handleHover);
        map.setTarget(undefined);
      };
    }
  }, [
    geoJsonData,
    scaleLineUnit,
    isZoomScaledOn,
    isoverViewMapOn,
    filteredGeoJsonData,
    currentGeometry,
  ]);

  const closeSideBarHandler = () => {
    setIsAnimating(true);
    setIsSideBarOpen(false);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300); // Match the CSS animation duration
  };

  const openSideBarHandler = () => {
    setIsAnimating(true);
    setIsSideBarOpen(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 750); // Match the CSS animation duration
  };

  const unitsHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setScaleLineUnit(e.target.value as Units);
  };

  const zoomSliderHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsZoomScaledOn(e.target.checked);
  };

  const animateView = (options: AnimationOptions) => {
    viewRef?.current?.animate(options);
  };

  const elasticToNewYork = () => {
    animateView({ center: newYork, duration: 2000, easing: elastic, zoom: 6 });
  };

  const overViewMapHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsOverViewMapOn(e.target.checked);
  };

  const showLegendHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setShowLegend(e.target.checked);
  };

  const filterHandler = (n: number) => {
    if (geoJsonData !== null) {
      const newFeatures = geoJsonData.features.filter((t) => {
        return t.properties.density > n;
      });

      setFilteredGeoJsonData(() => {
        const newGeoJsonData: GeoJsonData = {
          type: "FeatureCollection",
          features: newFeatures,
        };

        return newGeoJsonData;
      });
    }
  };

  const searchHandler = () => {
    if (inputRef.current !== null) {
      const val = inputRef.current.value;
      filterHandler(Number(val));
    }
  };

  const geoChangeHandler = (e) => {
    setCurrentGeometry(e.target.value);
  };

  return (
    <div className="grid grid-cols-12 grid-rows-12 pb-2 gap-2 w-screen h-screen">
      {/* HEADER */}
      <div className="col-span-12 row-span-1">
        <Header />
      </div>

      {/* SIDEBAR */}
      <div className="col-span-2 row-span-11 relative">
        <div
          className={`${
            isSideBarOpen ? "open-sidebar" : "close-sidebar"
          } w-full h-full bg-[#3590F0] rounded-r-lg absolute`}
        >
          <div className="">
            <button
              className="text-3xl text-white ml-52 mt-1"
              onClick={closeSideBarHandler}
            >
              <MdKeyboardDoubleArrowLeft />
            </button>

            <div className="absolute top-2 left-5">
              <h1 className="text-white text-lg font-semibold">
                CONTROL PANEL
              </h1>
            </div>

            <div className="mt-6 flex items-center checkbox-wrapper-12 ml-5">
              <div className="cbx">
                <input
                  type="checkbox"
                  name="zoomSlider"
                  id="zoomSlider"
                  onChange={zoomSliderHandler}
                  checked={isZoomScaledOn}
                />
                <label htmlFor="zoomSlider"></label>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>
              <label htmlFor="zoomSlider" className="text-white ml-2">
                Zoom Slider
              </label>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="goo-12">
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="4"
                      result="blur"
                    ></feGaussianBlur>
                    <feColorMatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                      result="goo-12"
                    ></feColorMatrix>
                    <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
                  </filter>
                </defs>
              </svg>
            </div>

            <div className="mt-6 flex items-center checkbox-wrapper-12 ml-5">
              <div className="cbx">
                <input
                  type="checkbox"
                  name="overViewMap"
                  id="overViewMap"
                  onChange={overViewMapHandler}
                  checked={isoverViewMapOn}
                />
                <label htmlFor="overViewMap"></label>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>
              <label htmlFor="overViewMap" className="text-white ml-2">
                Over View Map
              </label>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="goo-12">
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="4"
                      result="blur"
                    ></feGaussianBlur>
                    <feColorMatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                      result="goo-12"
                    ></feColorMatrix>
                    <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
                  </filter>
                </defs>
              </svg>
            </div>

            <div className="mt-6 flex items-center checkbox-wrapper-12 ml-5">
              <div className="cbx">
                <input
                  type="checkbox"
                  name="showLegend"
                  id="showLegend"
                  onChange={showLegendHandler}
                  checked={showLegend}
                />
                <label htmlFor="showLegend"></label>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
              </div>

              <label htmlFor="showLegend" className="ml-2 text-white">
                Show Legend
              </label>
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                  <filter id="goo-12">
                    <feGaussianBlur
                      in="SourceGraphic"
                      stdDeviation="4"
                      result="blur"
                    ></feGaussianBlur>
                    <feColorMatrix
                      in="blur"
                      mode="matrix"
                      values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
                      result="goo-12"
                    ></feColorMatrix>
                    <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
                  </filter>
                </defs>
              </svg>
            </div>

            <div className="mt-8 ml-5">
              <button
                onClick={() => {
                  elasticToNewYork();
                }}
                className="bg-white px-4 py-2 rounded-lg text-[#3590F0] hover:bg-[#2eca6f] outline-none active:text-white hover:text-white transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 active:bg-[#2edb6f]"
              >
                Go to New York
              </button>
            </div>

            <div className="mt-8 flex flex-col items-start space-y-1 ml-5">
              <input
                ref={inputRef}
                type="number"
                placeholder="Enter Population Density "
                className="px-2 py-2 mb-1 rounded-lg outline-none border-none placeholder:text-gray-500"
              />
              <button
                onClick={searchHandler}
                className="bg-white  px-4 py-2 rounded-lg text-[#3590F0] hover:bg-[#2eca6f] outline-none active:text-white hover:text-white transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 active:bg-[#2edb6f]"
              >
                Search
              </button>
            </div>

            <div className="mt-8  ml-5">
              <h1 className="text-white  text-[1.1rem]">Scale Line Units</h1>
              <select
                name="units"
                id="units"
                onChange={unitsHandler}
                defaultValue={"metric"}
                className="rounded-lg px-2 py-2 -ml-1 mt-1 white text-[#3590F0] focus:outline-none focus:ring-2 focus:ring-[#3590F0]"
              >
                <option value="degrees">Degrees</option>
                <option value="imperial">Imperial inch</option>
                <option value="us">Us inch</option>
                <option value="nautical">Nautical mile</option>
                <option value="metric">Metric</option>
              </select>
            </div>

            <div className="mt-4" id="type">
              <label htmlFor="type" className="block text-white mb-2">
                Geometry type
              </label>

              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="geometryType"
                    value="None"
                    className="form-radio text-blue-600"
                    onChange={geoChangeHandler}
                    defaultChecked
                  />
                  <span className="ml-2 text-white">None</span>
                </label>
              </div>

              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="geometryType"
                    value="Point"
                    className="form-radio text-blue-600"
                    onChange={geoChangeHandler}
                  />
                  <span className="ml-2 text-white">Point</span>
                </label>
              </div>

              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="geometryType"
                    value="Polygon"
                    className="form-radio text-blue-600"
                    onChange={geoChangeHandler}
                  />
                  <span className="ml-2 text-white">Polygon</span>
                </label>
              </div>

              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="geometryType"
                    value="Circle"
                    className="form-radio text-blue-600"
                    onChange={geoChangeHandler}
                  />
                  <span className="ml-2 text-white">Circle</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {!isSideBarOpen && !isAnimating && (
          <div className="h-[90vh] bg-white absolute left-0 top-0">
            <button
              className="text-3xl bg-[#3590F0] px-1 rounded-r-lg text-white"
              onClick={openSideBarHandler}
            >
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
        )}
      </div>

      {/* MAP */}
      <div className="relative col-span-10 row-span-11">
        {/* Map will be rendered here */}
        <div id="map" className="w-full h-full"></div>

        {/* Hover Effect */}
        {popoverVisible && (
          <div ref={popoverRef} className="absolute bg-white ol-popup">
            <div className="text-sm leading-3">
              <h3 className="mb-2 ">{popoverContent && popoverContent.name}</h3>
              <h3>Density: {popoverContent && popoverContent.density}</h3>
            </div>
          </div>
        )}

        {/* Legends */}
        {showLegend && (
          <div className="absolute bottom-14 left-2 bg-white p-2 border border-solid border-black rounded-lg">
            <Legend />
          </div>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
