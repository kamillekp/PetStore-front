import React, {useState, useEffect} from 'react';
import './styles.css';
import {useHistory} from 'react-router-dom'
import axios from 'axios';

//COMPONENTES PADRÃO
import Nav from '../../templates/block/Nav';
import Search from '../../templates/block/Search';
import Footer from '../../templates/block/Footer';

//COMPONENTES ESPECÍFICOS
import Banner from '../../templates/Home/Banner'
import Brands from '../../templates/Home/Brands'
import Highlights from '../../templates/Home/Highlights'

export default function Home() {
  const history = useHistory();
  const [discountProd, setDiscountProd] = useState([]);
  const [string, setString] = useState('');

  useEffect(()=>{
    async function fetchDiscountProducts(){
      const response = await axios.get('http://localhost:3333/products/highlights/list');
      setDiscountProd(response.data);
    }
    fetchDiscountProducts();
  },[])

  function hanldeSearch() {
    history.push(`products/list/${string}`);
  }

  return(
      <div className="home">
        <Nav/>
        <Banner/>
        <div className="search__products__wrapper">
          <Search string={string} setString={setString}/>
          <button onClick={hanldeSearch} className="purple">Pesquisar</button>
        </div>
        <Brands/>
        <h3>produtos em promoção para você :)</h3>
        <Highlights list={discountProd}/>
        <Footer/>
      </div>
  );
}
