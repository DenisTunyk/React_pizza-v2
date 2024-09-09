import React from 'react';
import axios from 'axios';

import { useContext } from 'react';
import { Categories } from '../components/Categories/Categories';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Sort } from '../components/Sort/Sort';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { Pagination } from '../components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { SearchContext } from 'components/App';

export const Home = () => {
  const { searchValue } = useContext(SearchContext);

  const dispatch = useDispatch();
  const categoryId = useSelector(state => state.filterReduce.categoryId);
  const sortType = useSelector(state => state.filterReduce.sort);
  const currentPage = useSelector(state => state.filterReduce.currentPage);

  // const { categoryId, sortType, currentPage } = useSelector(
  //   state => state.filterReduce
  // );

  const onChangeCategory = id => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = number => {
    dispatch(setCurrentPage(number));
  };

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  //const [categoryId, setCategoryId] = React.useState(0);
  //const [curentPage, setCurentPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);
    const order = sortType.sortProperty.includes('-') ? 'ask' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    console.log('SearchValue = ', searchValue);
    console.log('search = ', search);
    // Запрос через fetch
    // fetch(
    //   `https://640734a477c1a905a0f16e16.mockapi.io/api/v1/pizza?page=${curentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`
    // )
    //   .then(res => res.json())
    //   .then(arr => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   });

    //Запрос через axios
    console.log(
      `https://640734a477c1a905a0f16e16.mockapi.io/api/v1/pizza?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    axios
      .get(
        `https://640734a477c1a905a0f16e16.mockapi.io/api/v1/pizza?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then(res => {
        console.log(res);
        setItems(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage, searchValue]);

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
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? scelletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangeNumber={onChangePage} />
    </div>
  );
};
