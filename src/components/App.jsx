import { Header } from './Header/Header';
import { Categories } from './Categories/Categories';
import { Sort } from './Sort/Sort';
import { PizzaBlock } from './PizzaBlock/PizzaBlock';

export const App = () => {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock title="Мексиканская" price={500} />
            <PizzaBlock title="Мексиканская" price={333} />
            <PizzaBlock title="Мексиканская" price={111} />
            <PizzaBlock title="Мексиканская" price={888} />
            <PizzaBlock title="Мексиканская" price={999} />
          </div>
        </div>
      </div>
    </div>
  );
};
