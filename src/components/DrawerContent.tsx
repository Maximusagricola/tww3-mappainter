import { IconButton, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material/styles'; 
import CloseIcon from '@mui/icons-material/Close';
import CampaignSelect from './painter/ControlPane/CampaignSelect';
import ControlPane from './painter/ControlPane';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    ...theme.mixins.toolbar,
  },
  fillSpace: {
    flexGrow: 1,
  },
  toggleButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  scroller: {
    height: '100%',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 6,
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
    '&::-webkit-scrollbar-thumb:vertical': {
      width: 6,
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
    },
  }
}));

type DrawerContentProps = {
  toggleDrawer: () => void;
};

const DrawerContent = (props: DrawerContentProps) => {
  const { toggleDrawer } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CampaignSelect />
        <span className={classes.fillSpace}></span>
        <IconButton
          className={classes.toggleButton}
          color="inherit"
          edge="end"
          onClick={toggleDrawer}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <Divider />
      <div className={classes.scroller}>
        <ControlPane />
      </div>
    </div>
  );
};

export default DrawerContent;
