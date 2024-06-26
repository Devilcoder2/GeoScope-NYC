import { useEffect, useRef, useState } from "react";

import { Map, MapBrowserEvent, View } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import { FeatureLike } from "ol/Feature.js";
import { FullScreen, defaults as defaultControls } from "ol/control.js";

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

const MapComponent: React.FC = () => {
  const [geoJsonData, setGeoJsonData] = useState<GeoJsonData | null>(null);
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
  const [popoverContent, setPopoverContent] =
    useState<FeatureProperties | null>(null);

  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch(
        "https://openlayers.org/data/vector/us-states.json"
      );
      const data: GeoJsonData = await res.json();
      setGeoJsonData(data);
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
        features: new GeoJSON().readFeatures(geoJsonData, {
          featureProjection: "EPSG:3857",
        }),
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: (feature: FeatureLike) => {
          const density = feature.get("density");
          const color = getColorForDensity(density);
          return new Style({
            fill: new Fill({
              color: color,
            }),
            stroke: new Stroke({
              color: "#000",
              width: 0.5,
            }),
          });
        },
      });

      const map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        view: new View({
          center: [-11542437.750890903, 4862581.061116328],
          zoom: 4,
        }),
        controls: defaultControls().extend([new FullScreen()]),
      });

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
            const left = pixel[0] + 5 + "px";
            const top = pixel[1] - 60 + "px";

            popoverRef.current.style.left = left;
            popoverRef.current.style.top = top;
          }
        } else {
          setPopoverVisible(false);
        }
      };

      map.on("pointermove", handleHover);

      return () => {
        map.un("pointermove", handleHover);
        map.setTarget(undefined);
      };
    }
  }, [geoJsonData]);

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

  return (
    <div className="grid grid-cols-12 grid-rows-12 pb-2 gap-2 w-screen h-screen">
      <div className="col-span-12 row-span-1">
        <Header />
      </div>

      <div className="col-span-2 row-span-11 relative">
        <div
          className={`${
            isSideBarOpen ? "open-sidebar" : "close-sidebar"
          } w-full h-full bg-[#3590F0] rounded-r-lg absolute`}
        >
          <div>
            <button
              className="text-3xl text-white ml-52 mt-1"
              onClick={closeSideBarHandler}
            >
              <MdKeyboardDoubleArrowLeft />
            </button>
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

      <div className="relative col-span-10 row-span-11">
        {/* Map will be rendered here */}
        <div id="map" className="w-full h-full"></div>

        {/* Hover Effect */}
        {popoverVisible && (
          <div
            ref={popoverRef}
            className="absolute bg-white border border-solid border-black p-3 z-50 pointer-events-none"
          >
            <div className="text-sm leading-3">
              <h3>{popoverContent && popoverContent.name}</h3>
              <h3>Density: {popoverContent && popoverContent.density}</h3>
            </div>
          </div>
        )}

        {/* Legends */}
        <div className="absolute bottom-4 left-4 bg-white p-2 border border-solid border-black">
          <Legend />
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
