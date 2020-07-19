import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import NowWhat from './components/NowWhat';
import MetricSelect from './Features/Dashboard/MetricSelect';
import { Route, Switch, Link} from 'react-router-dom'
import Dashboard from './Features/Dashboard/Dashboard';
import { Button, Container } from '@material-ui/core';
import { Provider as UrqlProvider, createClient } from 'urql';



const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <Header />
        <Switch>
            <Route exact path="/">
                <NowWhat />
                <ToastContainer />
                <Container>
                  <Link to="/dashboard"><Button color="primary" variant="contained">View the dashboard</Button></Link>
                </Container>
            </Route>
            <Route path="/dashboard">
                <Dashboard/>
            </Route>
        </Switch>
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

export default () => {
  return (
    <UrqlProvider value={client}>
      <App />
    </UrqlProvider>
  );
};
