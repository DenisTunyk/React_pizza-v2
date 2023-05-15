import React from 'react';

import { Header } from './Header/Header';
import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';

export const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <NotFound></NotFound>
        </div>
      </div>
    </div>
  );
};
