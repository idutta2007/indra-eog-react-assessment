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
import { Route, Switch, Link} from 'react-router-dom'
import Dashboard from './Features/dashboard/Dashboard';
import { Button, Container } from '@material-ui/core';
import { Provider as UrqlProvider, createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

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

const subscriptionClient = new SubscriptionClient('wss://react.eogresources.com/graphql', { reconnect: true });

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation);
      },
    }),
  ]
});

export default () => {
  return (
    <UrqlProvider value={client}>
      <App />
    </UrqlProvider>
  );
};
