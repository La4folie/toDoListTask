import React, { useState } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {
  AppBar,
  Button,
  Container,
  createTheme,
  CssBaseline,
  LinearProgress,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material"
import "./App.css"
import { ErrorSnackbar } from "common/components"
import { TodolistsList } from "../features/todolistsList/TodolistsList"
import {selectStatus } from "./appSlice"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#367fc8",
      dark: "#60666f",
    },
    secondary: {
      main: "#2ad379",
      dark: "#418768",
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#367fc8",
      dark: "#60666f",
    },
    secondary: {
      main: "#2ad379",
      dark: "#418768",
    },
  },
});

function App() {
  const status = useSelector(selectStatus)
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) =>
      prevTheme === darkTheme ? lightTheme : darkTheme
    );
  };

  return (
    <BrowserRouter>
    <ThemeProvider theme={currentTheme}>
      <CssBaseline/>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{flexGrow: 1}}>To do List</Typography>
            <Button  color="inherit" onClick={toggleTheme}> 
                Change Theme
              </Button>
          </Toolbar>
          {status === "loading" && <LinearProgress color={"secondary"}/>}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList />} />
          </Routes>
        </Container>
      </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
