import { createTheme } from "@mui/material";

const commonColorOptions = {
    primary: {
      main: "#367fc8",
      dark: "#60666f",
    },
    secondary: {
      main: "#2ad379",
      dark: "#418768",
    },
    info: {
      main: '#FFFFFF',
      dark: '#000000',
    },
  }
  
  export const darkTheme = createTheme({
    palette: {
      mode: "dark",
      ...commonColorOptions,
    },
  });
  
  export const lightTheme = createTheme({
    palette: {
      mode: "light",
      ...commonColorOptions,
    },
  });