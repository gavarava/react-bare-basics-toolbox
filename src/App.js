import logo from './logo.svg';
import './App.css';
import MUIButton from '@material-ui/core/Button';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';

import { createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

function App() {
  return (
      <div className="App">
        <ThemeProvider theme={theme}>
        <header className="App-header">
          <GlobalStyles />
          <MUIButton
              color="primary"
              variant="contained"
          >TEST</MUIButton>
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        </ThemeProvider>
      </div>
  );
}

export default App;
