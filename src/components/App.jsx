import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './Header/Header';
import { Home } from '../pages/Home';
import { Cart } from '../pages/Cart';
import { NotFound } from '../pages/NotFound';

export const SearchContext = React.createContext();

export const App = () => {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
};
