import React from 'react';

import { Categories } from '../components/Categories/Categories';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Sort } from '../components/Sort/Sort';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { Pagination } from '../components/Pagination/Pagination';

export const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [curentPage, setCurentPage] = React.useState(1);
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
      `https://640734a477c1a905a0f16e16.mockapi.io/api/v1/pizza?page=${curentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
    )
      .then(res => res.json())
      .then(arr => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, curentPage]);

  let pizzas;

  if (searchValue !== undefined) {
    pizzas = items
      .filter(obj => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase()))
          return true;
        return false;
      })
      .map(obj => <PizzaBlock key={obj.id} {...obj} />);
  } else {
    pizzas = items.map(obj => <PizzaBlock key={obj.id} {...obj} />);
  }

  const scelletons = [...new Array(items.length)].map((_, index) => (
    <Sceleton key={index} />
  ));

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
      <div className="content__items">{isLoading ? scelletons : pizzas}</div>
      <Pagination
        curentPage={curentPage}
        onChangeNumber={number => setCurentPage(number)}
      />
    </div>
  );
};
