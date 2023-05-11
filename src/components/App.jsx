import { Header } from './Header/Header';
import { Categories } from './Categories/Categories';
import { Sort } from './Sort/Sort';
import { PizzaBlock } from './PizzaBlock/PizzaBlock';
import Pizza from '../assets/pizza.json';

export const App = () => {
  console.log(Pizza);
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
