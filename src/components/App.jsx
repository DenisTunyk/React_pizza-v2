import { Header } from './Header/Header';
import { Categories } from './Categories/Categories';
import { Sort } from './Sort/Sort';
import { PizzaBlock } from './PizzaBlock/PizzaBlock';
//import Pizza from '../assets/pizza.json';
import React from 'react';
import Sceleton from './PizzaBlock/Sceleton';

export const App = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://640734a477c1a905a0f16e16.mockapi.io/api/v1/pizza')
      .then(res => res.json())
      .then(arr => {
        setItems(arr);
        setIsLoading(false);
      });
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
            {isLoading
              ? [...new Array(6)].map((_, index) => <Sceleton key={index} />)
              : items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
