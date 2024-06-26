import { useEffect, useState, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Feature } from "ol";
import { Style, Fill, Stroke } from "ol/style";

import "ol/ol.css";

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
        style: (feature: Feature) => {
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
      });

      const handleHover = (event: any) => {
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
            const mapElement = map.getTargetElement();
            const mapRect = mapElement.getBoundingClientRect();

            const pixel = map.getPixelFromCoordinate(coordinates);
            const left = pixel[0] - mapRect.left + "px";
            const top = pixel[1] - mapRect.top + "px";

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
        map.setTarget(null);
      };
    }
  }, [geoJsonData]);

  return (
    <div className="relative w-[100vw] h-[100vh]">
      <div id="map" className="w-full h-full"></div>
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

      {/* if (density > 200) return "#13202D";
    if (density > 100) return "#14293D";
    if (density > 50) return "#16304D";
    if (density > 20) return "#1D365C";
    if (density > 10) return "#243A6B";
    if (density > 5) return "#2A417B";
    return "#2B448C"; */}

      <div className="absolute bottom-4 left-4 bg-white p-2 border border-solid border-black">
        <h3 className="text-sm font-bold">Density Legend</h3>
        <ul className="text-xs">
          <li>
            <span
              className="inline-block w-4 h-4 mr-2"
              style={{ backgroundColor: "#13202D" }}
            ></span>{" "}
            200
          </li>
          <li>
            <span
              className="inline-block w-4 h-4 mr-2"
              style={{ backgroundColor: "#14293D" }}
            ></span>{" "}
            100
          </li>
          <li>
            <span
              className="inline-block w-4 h-4 mr-2"
              style={{ backgroundColor: "#16304D" }}
            ></span>{" "}
            50
          </li>
          <li>
            <span
              className="inline-block w-4 h-4 mr-2"
              style={{ backgroundColor: "#1D365C" }}
            ></span>{" "}
            20
          </li>
          <li>
            <span
              className="inline-block w-4 h-4 mr-2"
              style={{ backgroundColor: "#243A6B" }}
            ></span>{" "}
            10
          </li>
          <li>
            <span
              className="inline-block w-4 h-4 mr-2"
              style={{ backgroundColor: "#2A417B" }}
            ></span>{" "}
            5
          </li>
          <li>
            <span
              className="inline-block w-4 h-4 mr-2"
              style={{ backgroundColor: "#2B448C" }}
            ></span>{" "}
            0-5
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MapComponent;
