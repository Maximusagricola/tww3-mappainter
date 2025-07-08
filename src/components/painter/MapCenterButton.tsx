// 🔄 Trigger rebuild: removed unused import
import { useCallback } from 'react';;
import Fab from '@mui/material/Fab';
import { makeStyles } from '@mui/styles';
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';
import { useMapContext } from '../map/context';

const useStyles = makeStyles((theme: any) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1000,
  },
}));

const MapCenterButton = () => {
  const classes = useStyles();
  const context = useMapContext();

  const onClick = useCallback(() => {
    const { map, bounds } = context;
    map.flyToBounds(bounds, {
      animate: true,
      duration: 2,
    });
  }, [context]); // Include context to avoid disabling lint rule

  return (
    <Fab size="medium" color="primary" className={classes.fab} onClick={onClick}>
      <FilterCenterFocusIcon />
    </Fab>
  );
};

export default MapCenterButton;
