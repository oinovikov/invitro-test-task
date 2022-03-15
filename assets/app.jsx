import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { StateProvider } from './store';

import './styles/app.scss';


const app = (
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>
);

const $root = document.getElementById('root');

$root && render(app, $root);
