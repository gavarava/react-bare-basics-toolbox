import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './App.css';
import namesData from './assets/data/names.json'
import {ThemeProvider} from 'styled-components';
import {lightTheme, darkTheme} from './theme';

import {GlobalStyles} from './global';
import {createTheme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import {useEffect, useState} from "react";
import AsyncAutoComplete from "./components/AsyncAutoComplete";

const theme = createTheme(createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
}));

function App() {
  return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <header className="App-header">
            <GlobalStyles/>
            <AsyncAutoComplete
                data={["Saphira", "Tom", "Betsy-May", "Larry-Huges"]}/>
          </header>
        </ThemeProvider>
      </div>
  );
};

export default App;
