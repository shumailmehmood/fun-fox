import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', 
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#46BCFF',
          '&:hover': {
            backgroundColor: '#2086CC', // Change this to a darker shade of blue
          },
        },
      },
    },
  },
});

