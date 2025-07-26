import { makeStyles } from '@mui/styles';
import { IconButton, Typography, Toolbar } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import TuneIcon from '@mui/icons-material/Tune';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    display: 'flex',
    flexDirection: 'column',
  },
  fillSpace: {
    flexGrow: 1,
  },
  toggleButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

type BarContentProps = {
  toggleDrawer: () => void;
};

function BarContent(props: BarContentProps) {
  const { toggleDrawer } = props;
  const classes = useStyles();

  return (
    <Toolbar>
      <div className={classes.title}>
        <Typography variant="h6" noWrap>
          Map Painter
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" noWrap>
          Total War: WARHAMMER III
        </Typography>
      </div>
      <span className={classes.fillSpace}></span>
      <IconButton
        className={classes.toggleButton}
        color="inherit"
        edge="end"
        onClick={toggleDrawer}
      >
        <TuneIcon />
      </IconButton>
    </Toolbar>
  );
}

export default BarContent;
