import { useEffect, useState } from "react";
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

  const fetchapi = async () => {
    const res = await fetch(
      "https://openlayers.org/data/vector/us-states.json"
    );
    const data: GeoJsonData = await res.json();
    setGeoJsonData(data);
  };

  useEffect(() => {
    fetchapi();
  }, []);

  useEffect(() => {
    if (geoJsonData) {
      console.log(geoJsonData);

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
          center: [0, 0],
          zoom: 2,
        }),
      });

      return () => map.setTarget(null);
    }
  }, [geoJsonData]);

  return <div id="map" className="w-[100vw] h-[100vh]"></div>;
};

export default MapComponent;
