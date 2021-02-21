import React, {useState, useEffect} from 'react';
import './styles.css';
import {Link} from 'react-router-dom'
import axios from 'axios'

export default function Product({product, setProducts, counter, setCounter}) {
  const [prod, setProd] = useState([]);
  const [newPrice, setNewPrice] = useState('');
  const [cont, setCont] = useState();
  const id = product.productId;

  //BUSCA O PRODUTO NA API COM BASE NO ID RECEBIDO DO ELEMENTO PAI
  useEffect(()=>{
    async function fetchProduct(){
      console.log(id)
      const response = await axios.get(`http://localhost:3333/products/${id}`);
      setProd(response.data);
      setCont(product.cont)
    }
    fetchProduct();
  },[]);

  //CALCULA O PREÇO DO PRODUTO COM BASE NO DESCONTO
  useEffect(()=>{
    function handlePrice(){
      if(prod.discount){
        setNewPrice((prod.price - prod.price * (prod.discount/100)).toFixed(2));
      }else{
        setNewPrice(prod.price)
      }
    }
    handlePrice();
  })

  //GERENCIA A QUANTIDADE DE PRODUTOS DE CADA PRODUTO NO CARRINHO
  useEffect(()=>{
    function handleContProduct(e){
      const cart = JSON.parse(localStorage.getItem("cart"));
      const el = cart.find(element => element.productId === id);
      if(el){
        const data = {
          productId: id,
          cont: cont 
        }
        cart.splice(cart.indexOf(el), 1);
        cart.push(data)
        localStorage.setItem('cart',JSON.stringify(cart))
        var test = parseInt(counter) + cont;
        console.log(test);
        setCounter(test)
      }
    }
    handleContProduct();
  },[cont]);  

  //REMOVE O PRODUTO DO CARRINHO
  function handleDelete(){
    const cart = JSON.parse(localStorage.getItem("cart"));
    const el = cart.find(element => element.productId === id);
    if(el){
      cart.splice(cart.indexOf(el), 1);
      localStorage.setItem('cart',JSON.stringify(cart))
    }
    setProducts(state => state.filter(element => element.productId !== id));
  }

  return(
    <div className="cart__description">
        <div className="cart__description__picture"></div>
        <div className="cart__description__details">
            <div className="highlights__card__description-name">{prod.name}</div>
            <div className="highlights__card__description-price">{newPrice}</div>
            <div className="cart__description__details-amount">
                <input type="number" min="1" max="20" value={cont} onChange={e => {setCont(e.target.value)}}/>
            </div>
            <Link className="cart__description__remove" onClick={handleDelete}>remover</Link>
        </div>
    </div>
  );
}
