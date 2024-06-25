import { useEffect, useState, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

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
  const [popoverVisible, setPopOverVisibe] = useState<boolean>(false);
  const [popoverContent, setPopOverContent] =
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

  useEffect(() => {
    if (geoJsonData) {
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geoJsonData, {
          featureProjection: "EPSG:3857",
        }),
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
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
          zoom: 5,
        }),
      });

      const handleHover = (event) => {
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

            setPopOverContent(content);
          }

          setPopOverVisibe(true);

          //calculate position for popover
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
          setPopOverVisibe(false);
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
          className="absolute bg-white border border-solid border-black p-3 z-1000 pointer-events-none"
        >
          <div className="text-sm leading-3">
            <h3>{popoverContent && popoverContent.name}</h3>
            <h3>Density: {popoverContent && popoverContent.density}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
