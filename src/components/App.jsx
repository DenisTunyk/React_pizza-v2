import { Header } from './Header/Header';
import { Categories } from './Categories/Categories';
import { Sort } from './Sort/Sort';
import { PizzaBlock } from './PizzaBlock/PizzaBlock';
import Pizza from '../assets/pizza.json';
import React from 'react';

export const App = () => {
  //const [items, setItems] = React.useEffect([]);

  React.useEffect(() => {
    fetch('https://640734a477c1a905a0f16e16.mockapi.io/api/v1/:pizza').then(
      res => res.json().then(json => console.log(json))
    );
  }, []);
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {Pizza.map(obj => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
