import React from 'react';
import cl from './Search.module.css';

const Search = () => {
  return (
   <div> 
      <div className={cl.search__item}>Самый дешевый</div>
      <div className={cl.search__item}>Самый быстрый</div>
      <div className={cl.search__item}>Оптимальный</div>
   </div> 
  );
};

export default Search;
