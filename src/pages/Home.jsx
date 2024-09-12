import React, { useRef } from 'react';
import axios from 'axios';
import qs from 'qs';

import { useContext, useEffect } from 'react';
import { Categories } from '../components/Categories/Categories';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { menu, Sort } from '../components/Sort/Sort';
import Sceleton from '../components/PizzaBlock/Sceleton';
import { Pagination } from '../components/Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { SearchContext } from 'components/App';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

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

  const fetchPizzas = () => {
    setIsLoading(true);
    const order = sortType.sortProperty.includes('-') ? 'ask' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    // console.log('SearchValue = ', searchValue);
    // console.log('search = ', search);
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
    // console.log(
    //   `https://640734a477c1a905a0f16e16.mockapi.io/api/v1/pizza?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    // );
    axios
      .get(
        `https://640734a477c1a905a0f16e16.mockapi.io/api/v1/pizza?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then(res => {
        console.log(res);
        setItems(res.data);
        setIsLoading(false);
      });
  };

  //Если был первый рендер, то проверяем запросы qwery
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = menu.find(obj => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, currentPage, searchValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, currentPage, navigate]);

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
