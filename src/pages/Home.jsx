import React from 'react';

import { Categories } from '../components/Categories/Categories';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Sort } from '../components/Sort/Sort';
import Sceleton from '../components/PizzaBlock/Sceleton';

export const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sort: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);
    const order = sortType.sort.includes('-') ? 'ask' : 'desc';
    const sortBy = sortType.sort.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    fetch(
      `https://640734a477c1a905a0f16e16.mockapi.io/api/v1/pizza?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then(res => res.json())
      .then(arr => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);
  // console.log(sortType);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={id => setCategoryId(id)}
        />
        <Sort value={sortType} onClickType={type => setSortType(type)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(items.length)].map((_, index) => (
              <Sceleton key={index} />
            ))
          : items.map(obj => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};
