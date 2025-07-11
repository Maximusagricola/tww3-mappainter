import { makeStyles } from '@mui/styles';
import { IconButton, Typography, Toolbar } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import TuneIcon from '@mui/icons-material/Tune';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpIcon from '@mui/icons-material/Help';

const useStyles = makeStyles((theme: Theme) => ({

  title: {
    display: 'flex',
    flexDirection: 'column',
  },
  github: {
    [theme.breakpoints.up('md')]: {
      marginRight: -12,
    },
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
        color="inherit"
        component="a"
        href="https://steamcommunity.com/sharedfiles/filedetails/?id=2244941200"
        target="_blank"
        rel="noopener noreferrer"
      >
        <HelpIcon />
      </IconButton>
      <IconButton
        className={classes.github}
        color="inherit"
        component="a"
        href="https://github.com/IMRZ/tww2-map-painter"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
      </IconButton>
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
