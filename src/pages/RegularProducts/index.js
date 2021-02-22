import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import api from '../../services/api'
import './styles.css'

//COMPONENTES PADRÃO
import Nav from '../../templates/block/Nav';
import Footer from '../../templates/block/Footer';
import Search from '../../templates/block/Search';
import {useHistory} from 'react-router-dom'

import Card from '../../templates/Home/HighlightCard'

export default function Products() {
    const history = useHistory();
    const [products, setProducts] = useState([]);
    let { string } = useParams();
    const [search, setSearch] = useState(string);
    useEffect(()=>{
        async function fetchProducts(){
          const response = await api.get(`/products`);
          let filtered = response.data.filter(function (e) {
            return (e.name).toLowerCase().includes(search.toLowerCase());
          });
          setProducts(filtered)
        }
        fetchProducts();
      },[string])

    function filterByValue() {
        history.push(`${search}`);
    }

    return(
      <div className="products">
        <Nav/>
        <div className="search__products__wrapper">
            <Search string={search} setString={setSearch}/>
            <button onClick={filterByValue} className="purple">Pesquisar</button>
        </div>
        <div className="title__filter__wrapper">
            <h3>exibindo todos os produtos da busca</h3>
        </div>
        <div className="products__wrapper">
            <div className="highlights">
                {products.map (item =>
                    <Card product={item} key={item.id} />    
                )}
            </div>
        </div>
        <Footer/>
      </div>
  );
}
