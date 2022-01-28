import * as React from 'react';
import {useState} from 'react';
import './App.css';
import namesData from './assets/data/names.json'
import {ThemeProvider} from 'styled-components';

import {GlobalStyles} from './global';
import {createTheme} from '@material-ui/core/styles';
import AsyncAutoComplete from "./components/AsyncAutoComplete";
import {Button, Container, Grid, ImageList} from "@material-ui/core";
import SimpleTextInputSubmit from "./components/SimpleTextInputSubmit";
import {Stack} from "@mui/material";
import Header from "./components/Header";

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
  const [selectedDemo, setSelectedDemo] = useState('home')
  const handleSelectDemo = (pageState) => {
    setSelectedDemo(pageState)
  }

  return (

      <ThemeProvider theme={theme}>
        <header className="App-header">
          <Header headerButtonAction={() => handleSelectDemo('home')} headerButtonValue={"Home"}/>
        </header>
        <div className="App-body">
        {(() => {
          switch (selectedDemo) {
            case 'home':
              return (
                  <Container maxWidth="lg">
                    <Stack spacing={5} sx={{ width: 300 }}>
                    <Grid>
                      <Button name={"Submit"} variant={"contained"}
                              color={"secondary"}
                              onClick={() => handleSelectDemo(
                                  'SimpleTextInputSubmit')}>SimpleTextInputSubmit</Button>
                    </Grid>
                    <Grid>
                      <Button name={"Submit"} variant={"contained"}
                              color={"secondary"}
                              onClick={() => handleSelectDemo(
                                  'AsyncAutoComplete with Large DB')}>AsyncAutoComplete
                        with Large DB'</Button>
                    </Grid>
                    <Grid>
                      <Button name={"Submit"} variant={"contained"}
                              color={"secondary"}
                              onClick={() => handleSelectDemo(
                                  'AsyncAutoComplete Very Small DB')}>AsyncAutoComplete
                        Very Small DB</Button>
                    </Grid>
                    </Stack>
                  </Container>

              )
            case 'SimpleTextInputSubmit':
              return (
                  <Container maxWidth="lg">
                    <Grid>
                      <SimpleTextInputSubmit/>
                    </Grid>
                  </Container>
              )
            case 'AsyncAutoComplete with Large DB':
              return (
                  <Container maxWidth="sm">
                    <Grid>
                      <ImageList>
                        <AsyncAutoComplete
                            label="Large DB"
                            data={/*["Saphira", "Tom", "Betsy-May", "Larry-Huges"]*/ namesData.names}/>
                      </ImageList>
                    </Grid>
                  </Container>
              )
            case 'AsyncAutoComplete Very Small DB':
              return (
                  <Container maxWidth="sm">
                    <ImageList>
                      <AsyncAutoComplete
                          label="Very Small DB"
                          data={["Saphira", "Tom", "Betsy-May",
                            "Larry-Huges"]}/>
                    </ImageList>
                  </Container>
              )
            default:
              return null
          }
        })()}
        </div>
      </ThemeProvider>
  );
};

export default App;
