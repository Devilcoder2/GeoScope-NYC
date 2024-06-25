import { useEffect, useState } from "react";

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

  return <div id="map" className="w-[100vw] h-[100vh]"></div>;
};

export default MapComponent;
