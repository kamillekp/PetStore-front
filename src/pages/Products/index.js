import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import './styles.css'

//COMPONENTES PADRÃO
import Nav from '../../templates/block/Nav';
import Footer from '../../templates/block/Footer';
import Search from '../../templates/block/Search';

import Card from '../../templates/Home/HighlightCard'

export default function Products() {
    let { category } = useParams();
    const [categoria, setCategoria] = useState('');
    const [products, setProducts] = useState([]);
    const [string, setString] = useState('');

    useEffect(()=>{
        async function fetchProducts(){
          const response = await axios.get(`http://localhost:3333/products/category/${category}`);
          setProducts(response.data);
        }
        fetchProducts();
    }, [category])

    useEffect(()=>{
        function handleCategory(){
            if(category === 'dog'){
                setCategoria("Cães");
            } else if(category === 'cat'){
                setCategoria('Gatos')
            }else if(category === 'rodent'){
                setCategoria("Roedores")
            }
        }
        handleCategory();
    })

    function filterByValue() {
        let filtered = products.filter(function (e) {
            return (e.name).toLowerCase().includes(string.toLowerCase());
        });
        setProducts(filtered)
    }

    return(
      <div className="products">
        <Nav/>
        <div className="search__products__wrapper">
            <Search string={string} setString={setString}/>
            <button onClick={filterByValue} className="purple">Pesquisar</button>
        </div>
        <div className="title__filter__wrapper">
            <h3>exibindo produtos da categoria "{categoria}"</h3>
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
