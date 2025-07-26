import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import L from 'leaflet';
import { makeStyles } from '@mui/styles';
import { useMapContext, createSvgElement } from '../map/context';
import { useAppSelector, useAppDispatch } from '../../store';
import { regionChanged, regionOwnerChanged } from '../../store/painter';
import type { Campaign, Region } from '../../data/campaigns';

const useStyles = makeStyles({
  path: {
    opacity: 0.75,
    fillOpacity: 0.75,
    stroke: '#000',
    strokeWidth: 1.5,
    '&:hover': {
      opacity: 0.8,
    },
  },
});

const RegionAreaLayer = () => {
  const [svgElem, setSvgElem] = useState<SVGSVGElement | null>(null);
  const context = useMapContext<Campaign>();

  React.useEffect(() => {
    const { map, bounds, campaign } = context;

    const handle = requestAnimationFrame(() => {
      const paneName = 'overlayPane';

      const svgElement = createSvgElement(campaign.map.width, campaign.map.height);
      svgElement.style.pointerEvents = 'auto';
      svgElement.style.position = 'absolute';
      svgElement.style.top = '0';
      svgElement.style.left = '0';
      svgElement.style.zIndex = '350'; // higher than base, lower than markers

      const layer = L.svgOverlay(svgElement, bounds, {
        interactive: true,
        pane: paneName,
      });
      map.addLayer(layer);
      context.addOverlay('region-paths', 'Region owner areas', layer);
      setSvgElem(svgElement);
    });

    return () => cancelAnimationFrame(handle);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (svgElem === null) return null;

  const regionpaths = Object.values(context.campaign.regions).map((region: any) => (
    <RegionPath key={region.key} region={region} />
  ));

  return ReactDOM.createPortal(regionpaths, svgElem);
};

const RegionPath = (props: { region: Region }) => {
  const classes = useStyles();
  const { region } = props;
  const { fillColor, onClickRegion } = useRegionPath(region);

  if (!region.d) {
    console.warn('⚠️ Missing path data for region:', region.key);
    return null;
  }

  return (
    <path
      className={clsx('leaflet-interactive', classes.path)}
      onClick={onClickRegion}
      d={region.d}
      fill={fillColor}
    />
  );
};

function useRegionPath(region: Region) {
  const fillColor = useAppSelector((state) => {
    const factionKey = state.painter.ownership[region.key];
    const faction = factionKey ? state.painter.factions[factionKey] : null;
    return faction?.color || '#888'; // fallback gray if undefined
  });

  const dispatch = useAppDispatch();
  const isModeInteractive = useAppSelector((state) => state.painter.mode === 'interactive');
  const selectedFaction = useAppSelector((state) => state.painter.selectedFaction);
  const onClickRegion = React.useCallback(() => {
    if (isModeInteractive) {
      dispatch(regionChanged(region.key));
    } else {
      dispatch(regionOwnerChanged([region.key, selectedFaction]));
    }
  }, [region.key, dispatch, isModeInteractive, selectedFaction]);

  return {
    fillColor,
    onClickRegion,
  };
}

export default RegionAreaLayer;
