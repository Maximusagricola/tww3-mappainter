import React, { useCallback } from 'react';
import L from 'leaflet';
import { MapContext, BaseCampaign } from './context';
import { Button, Box } from '@material-ui/core';

type MapProps<C extends BaseCampaign> = {
  children: React.ReactNode;
  campaign: C;
};

const Map = <C extends BaseCampaign>(props: MapProps<C>) => {
  const { children, campaign } = props;

  const bounds = [
    [0, 0],
    [campaign.map.height, campaign.map.width],
  ] as L.LatLngBoundsLiteral;

  const contextState = React.useRef({
    map: null as any,
    layers: {} as any,
    waitFor: [] as Promise<void>[],
    bounds,
    campaign,
  });

  const [loaded, setLoaded] = React.useState(false);
  const [zoom, setZoom] = React.useState(0);

  const mapContainer = useCallback((el: HTMLDivElement | null) => {
    if (el !== null) {
      const leafletMap = L.map(el, {
        crs: L.CRS.Simple,
        minZoom: -2,
        maxZoom: 2,
        inertiaMaxSpeed: Infinity,
        zoomControl: false,
        attributionControl: false,
        doubleClickZoom: false,
        maxBounds: bounds,
        zoomSnap: 0.2,
        zoomAnimation: true,
        markerZoomAnimation: true,
        scrollWheelZoom: true,
      });

      leafletMap.fitBounds(bounds);
      leafletMap.on('zoomend', () => {
        setZoom(leafletMap.getZoom());
      });

      contextState.current.map = leafletMap;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    const map = contextState.current.map!;
    const waitFor = contextState.current.waitFor!;

    Promise.all(waitFor).then(() => {
      setLoaded(true);
    });

    return () => {
      map.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleZoomIn = () => {
    contextState.current.map.zoomIn();
  };

  const handleZoomOut = () => {
    contextState.current.map.zoomOut();
  };

  return (
    <MapContext.Provider value={contextState}>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', opacity: loaded ? 1 : 0, transition: 'opacity 1s' }}>
        <div ref={mapContainer} style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }} />

        {/* Custom Zoom Controls */}
        <Box
          position="absolute"
          bottom={20}
          right={20}
          zIndex="tooltip"
          display="flex"
          flexDirection="column"
        >
          <Button variant="contained" size="small" onClick={handleZoomIn} style={{ marginBottom: 4 }}>+</Button>
          <Button variant="contained" size="small" onClick={handleZoomOut}>−</Button>
        </Box>

        {children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;
