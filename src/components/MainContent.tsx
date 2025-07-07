import { makeStyles } from '@mui/styles';
import { useStore } from 'react-redux';
import { useAppSelector } from '../store';
import Map from './map/Map';
import MapImageLayer from './painter/MapImageLayer';
import RegionMarkerLayer from './painter/RegionMarkerLayer';
import RegionAreaLayer from './painter/RegionAreaLayer';
import MapEventListener from './painter/MapEventListener';
import MapCenterButton from './painter/MapCenterButton';

const useStyles = makeStyles(() => ({
  map: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#222',
  },
  debugText: {
    color: 'white',
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 9999,
  },
}));

const MainContent = () => {
  const store = useStore();
  const hasStore = typeof store?.getState === 'function';

  // Prevent hook call if context is missing
  if (!hasStore) {
    console.error("🚨 Redux store context not found. Did you forget <Provider store={store}>?");
    return (
      <div style={{ color: 'red', padding: '2rem' }}>
    ⚠️ Redux store not found. Make sure the app is wrapped in &lt;Provider store=&quot;store&quot;&gt;.
      </div>
    );
  }

  const campaign = useAppSelector((state) => state.painter.campaign);
  const classes = useStyles();

  if (!campaign) {
    return <div style={{ color: '#ccc', padding: '2rem' }}>⚠️ No campaign selected</div>;
  }

  return (
    <div className={classes.map} key={campaign.key}>
      <div className={classes.debugText}>🗺️ Map container mounted</div>
      <Map campaign={campaign}>
        <MapImageLayer />
        <RegionAreaLayer />
        <RegionMarkerLayer />
        <MapEventListener />
        <MapCenterButton />
      </Map>
    </div>
  );
};

export default MainContent;
