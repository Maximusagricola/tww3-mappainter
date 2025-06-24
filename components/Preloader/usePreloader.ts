import { useReducer, useEffect, useState } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PreloaderState {
  progress: number[];
}

const initialState: PreloaderState = {
  progress: [],
};

const preloaderSlice = createSlice({
  name: 'preloaderLocal',
  initialState,
  reducers: {
    updateProgress(state, action: PayloadAction<[number, number]>) {
      const [index, value] = action.payload;
      state.progress[index] = value;
    },
  },
});

const cache: Record<string, true> = {};

export function usePreloader(assetPaths: string[]) {
  const [state, dispatch] = useReducer(preloaderSlice.reducer, initialState);
  const [loaded, setLoaded] = useState(false);

  const updateProgress = (index: number, value: number) => {
    dispatch(preloaderSlice.actions.updateProgress([index, value]));
  };

  useEffect(() => {
    const cacheKey = assetPaths.join('|');
    if (cache[cacheKey]) {
      setLoaded(true);
      return;
    }

    const promises = assetPaths.map((path, index) =>
      loadImage(path, (e) => {
        if (e.lengthComputable) {
          updateProgress(index, Math.round((e.loaded / e.total) * 100));
        }
      })
    );

    Promise.all(promises).then(() => {
      setTimeout(() => setLoaded(true), 500);
      cache[cacheKey] = true;
    });
  }, []);

  const totalProgress =
    assetPaths.length === 0
      ? 100
      : Math.round(state.progress.reduce((sum, v) => sum + (v || 0), 0) / assetPaths.length);

  return {
    loaded,
    progress: totalProgress,
  };
}

function loadImage(path: string, onProgress: (e: ProgressEvent<EventTarget>) => void): Promise<void> {
  return new Promise<void>((resolve) => {
    const req = new XMLHttpRequest();
    req.open('GET', path, true);
    req.responseType = 'blob';
    req.onprogress = onProgress;
    req.onload = () => resolve();
    req.onerror = () => resolve();
    req.send();
  });
}
