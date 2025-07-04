import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography, Toolbar } from '@material-ui/core';
import { Tune } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
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
          Total War: Warhammer III EXPANDED
        </Typography>
      </div>
      <span className={classes.fillSpace}></span>
      <IconButton
        className={classes.toggleButton}
        color="inherit"
        edge="end"
        onClick={toggleDrawer}
      >
        <Tune />
      </IconButton>
    </Toolbar>
  );
}

export default BarContent;
