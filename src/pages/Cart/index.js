import React, {useState, useEffect} from 'react';
import './styles.css';
import {useHistory} from "react-router-dom";
import axios from 'axios'

//COMPONENTES PADRÃO
import Nav from '../../templates/block/Nav';
import Footer from '../../templates/block/Footer';

import Product from '../../templates/Cart/Product'

export default function Cart() {
    const [products, setProducts] = useState([]);
    const [counter, setCounter] = useState(0);
    const [acm, setAcm] = useState(0);
    const [inicialPrice, setInicialPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);

	const history = useHistory();
	const token = localStorage.getItem('Token');
	const userId = localStorage.getItem('UserId');
    const cart = JSON.parse(localStorage.getItem("cart"))
    
    //BUSCA PRODUTOS NO LOCALSTORAGE
    useEffect(()=>{
        function handleLocalStorageCart(){
            setProducts(cart)
        }
        handleLocalStorageCart();
    },[])

    //GERENCIA O RESUMO DA COMPRA
    useEffect(()=>{
        async function handleSummary () {
            var totalProducts = 0;
            var inicialPrice = 0;
            var totalPrice = 0;
            for(var item in cart){
                //QUANTIDADE TOTAL DE PRODUTOS
                totalProducts = totalProducts + parseInt(cart[item].cont);
                //PREÇO INICIAL SEM DESCONTO
                inicialPrice = inicialPrice + parseInt(cart[item].cont) * (parseFloat(await getInitialProductPrice(cart[item].productId))) ;
                //PREÇO TOTAL COM DESCONTO
                totalPrice = totalPrice + parseInt(cart[item].cont) * (parseFloat(await getProductPrice(cart[item].productId)));
            }
            setAcm(totalProducts)
            setInicialPrice((inicialPrice).toFixed(2))
            setPrice((totalPrice).toFixed(2))
            setDiscount((inicialPrice - totalPrice).toFixed(2));
        }
        handleSummary()
    })

    async function getProductPrice(id){        
        const response  = await axios.get(`http://localhost:3333/products/${id}`);
        const product = response.data;
        if(product.discount != null){
            return (product.price - product.price * (product.discount/100))
        }else{
            return product.price
        }
    }

    async function getInitialProductPrice(id){        
        const response  = await axios.get(`http://localhost:3333/products/${id}`);
        const product = response.data;
        return product.price;
    }


    async function handleSendCart(){
        if(token){
            if(cart){
                const response  = await axios.get(`http://localhost:3333/user/${userId}`);
                const user = response.data[0];
                const data = {
                    name: user.name,
                    email: user.email,
                    total: price
                }
                await axios.post('http://localhost:3333/cart/', data);
                alert("Oba! verifique seu e-mail para acessar mais detalhes da compra")
                localStorage.removeItem('cart');
                setProducts()
            }
        }else{
            history.push('/login');
        }
    }

    return(
      <div className="cart">
        <Nav/>
        <h3>meu carrinho</h3>
        <div>
            { // LISTA OS PRODUTOS DO CARRINHO, CASO EXISTAM
                products && (
                <div  className="cart__wrapper">
                    <div className="cart__products__wrapper">
                        {products.map ( item => 
                            <Product key={item.productId} product={item} setProducts={setProducts} counter={counter} setCounter={setCounter} />
                        )}
                    </div>
                    <div className="cart__sumary">
                        <h4>resumo do pedido</h4>
                        <div className="cart__sumary__double">
                            <div>
                                {acm} 
                                {acm > 1 && (<span> produtos</span>)}
                                {acm === 1 && (<span> produto</span>)}
                            </div>
                            <div>{inicialPrice}</div>
                        </div>
                        {discount>0 && (
                            <div className="cart__sumary__item">-{discount}</div>
                        )}
                        <hr/>
                        <div className="cart__sumary__double">
                            <div>total</div>
                            <div>{price}</div>
                        </div>
                        <div className="cart__sumary__button__wrapper">
                            <button onClick={handleSendCart} className="purple">FINALIZAR COMPRA</button>
                        </div>
                    </div>
                </div>
                )
            }

            { // MENSAGEM CASO NÃO EXISTAM PRODUTOS NO CARRINHO
                !products && (
                    <div>
                        <h4>Oops, nada por aqui :/</h4>
                    </div>
                )
            }
            
        </div>
        <Footer/>
      </div>
  );
}
