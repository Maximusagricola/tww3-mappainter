import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#dc004e', // Pinkish-red
    },
    background: {
      default: '#f4f6f8',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: `'Roboto', 'Segoe UI', sans-serif`,
    fontSize: 14,
    h1: {
      fontSize: '2.2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
