import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { usePreloader } from './preloaderUtils'; 

type PreloaderProps = {
  children: React.ReactElement;
  assets: string[];
};

const Preloader = (props: PreloaderProps) => {
  const { loaded, progress } = usePreloader(props.assets);

  if (!loaded) {
    return (
      <Box height="100%" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress variant="determinate" value={progress} />
      </Box>
    );
  }

  return <>{props.children}</>;
};

export default Preloader;
