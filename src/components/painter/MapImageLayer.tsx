import React from 'react';
import L from 'leaflet';
import { useMapContext } from '../map/context';

const MapImageLayer = () => {
  const context = useMapContext();

  React.useEffect(() => {
    const { campaign, map, bounds, waitFor } = context;
    console.log("🖼️ Adding map image layer:", campaign.map.image);
    console.log("📏 Map bounds:", bounds);

    const imageOverlay = L.imageOverlay(campaign.map.image, bounds, { opacity: 0.5 });
    const onLoad = new Promise<void>((resolve) => {
      imageOverlay.on('load', () => {
        console.log("✅ Map base image loaded");
        resolve();
      });
    });
    waitFor.push(onLoad);

    map.addLayer(imageOverlay);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default MapImageLayer;
