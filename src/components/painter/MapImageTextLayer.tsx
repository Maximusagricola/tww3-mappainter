import React from 'react';
import L from 'leaflet';
import { useMapContext } from '../map/context';

const MapImageTextLayer = () => {
  const context = useMapContext();

  React.useEffect(() => {
    const { map, campaign, bounds, waitFor } = context;
    console.log("🖼️ Adding text overlay layer:", campaign.map.imageText);

    const pane = map.createPane('labels');
    pane.style.setProperty('z-index', '450');
    pane.style.setProperty('pointer-events', 'none');

    const layer = L.imageOverlay(campaign.map.imageText, bounds, { pane: 'labels' });
    const onLoad = new Promise<void>((resolve) => {
      layer.on('load', () => {
        console.log("✅ Map text overlay loaded");
        resolve();
      });
    });
    waitFor.push(onLoad);

    map.addLayer(layer);
    context.addOverlay('map-text', 'Map labels', layer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default MapImageTextLayer;
