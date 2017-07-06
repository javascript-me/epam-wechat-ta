import 'babel-polyfill';
import React from 'react';
import {
  render
} from 'react-dom';
import {
  Provider
} from 'react-redux';
import { Router, browserHistory} from 'react-router';
import routes from './routes';
import './styles/styles.less';

render(
    <Router history={browserHistory} routes={routes}/>,
    document.getElementById('app')
);
 