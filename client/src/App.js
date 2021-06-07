import logo from './logo.svg';
import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import DashboardPage from './screens/Dashboard/Dashboard';
import history from './services/history';
import Routes from './services/routes';
import './css/preset.scss';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  )
}

export default App;
