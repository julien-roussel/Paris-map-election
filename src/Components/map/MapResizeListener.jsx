import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapResizeListener = ({ trigger }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.invalidateSize();
    }
  }, [trigger, map]);

  return null;
};

export default MapResizeListener;
