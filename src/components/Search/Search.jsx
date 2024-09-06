import React, { useState } from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { SearchContext } from 'components/App';
import { useRef, useCallback } from 'react';

export const Search = () => {
  const [value, setValue] = useState('');
  const { searchValue, setSearchValue } = React.useContext(SearchContext);

  const refInput = useRef();

  // будет создаваться при первом вызове и при рендери новая создаваться не будет.
  const testDebounce = useCallback(
    debounce(str => {
      console.log(str);
      setSearchValue(str);
      console.log(searchValue);
    }, 1000),
    []
  );

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    refInput.current.focus();
  };

  const onChangeInput = e => {
    setValue(e.target.value);
    testDebounce(e.target.value);
  };

  return (
    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 50 50">
        <rect fill="none" height="50" width="50" />
        <circle cx="21" cy="20" fill="none" r="16" stroke="#000000" />
        <line
          fill="none"
          stroke="#000000"
          x1="32.229"
          x2="45.5"
          y1="32.229"
          y2="45.5"
        />
      </svg>

      <input
        ref={refInput}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.delete}
          id="Layer_1"
          viewBox="0 0 512 512"
        >
          <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
        </svg>
      )}
    </div>
  );
};
