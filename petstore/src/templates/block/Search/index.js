import React from 'react';
import './styles.css';

export default function Home({string, setString}) {
  return(
    <div className="search">
        <input 
          className="search__input"
          type="text"
          value={string}
          placeholder="Localizar produtos"
          onChange={e => setString(e.target.value)}
        />
    </div>
  )
}