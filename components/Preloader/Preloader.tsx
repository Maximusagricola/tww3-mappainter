import React from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { usePreloader } from './usePreloader'; // ✅ local sibling file

type PreloaderProps = {
  children: React.ReactNode;
  assets: string[];
};

const Preloader: React.FC<PreloaderProps> = ({ children, assets }) => {
  const { loaded, progress } = usePreloader(assets);

  if (!loaded) {
    return (
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress variant="determinate" value={progress} />
        <Typography variant="body2" style={{ marginTop: 8 }}>
          {progress}%
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
};

export default Preloader;
