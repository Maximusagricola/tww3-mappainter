import React from 'react';
import { makeStyles } from '@mui/styles';
import type { Theme } from '@mui/material/styles';
import { AppBar, Toolbar, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 320;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flex: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: drawerWidth,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#303030',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));

type AppLayoutProps = {
  drawerOpen: boolean;
  toggleDrawer: () => void;
  barContent: React.ReactElement;
  mainContent: React.ReactElement;
  drawerContent: React.ReactElement;
};

const AppLayout = (props: AppLayoutProps) => {
  const { drawerOpen, toggleDrawer, barContent, mainContent, drawerContent } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed" color="default" elevation={0}>
        {barContent}
      </AppBar>

      <main className={classes.content}>
        <Toolbar />
        {mainContent}
      </main>

      <nav className={classes.drawer}>
        {isDesktop ? (
          <Drawer
            classes={{ paper: classes.drawerPaper }}
            variant="permanent"
            anchor="right"
            open
          >
            {drawerContent}
          </Drawer>
        ) : (
          <Drawer
            variant="temporary"
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }}
          >
            {drawerContent}
          </Drawer>
        )}
      </nav>
    </div>
  );
};

export default AppLayout;
