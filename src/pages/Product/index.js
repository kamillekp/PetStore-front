import React, {useState, useEffect} from 'react';
import './styles.css'
import { useParams, useHistory} from "react-router-dom";
import api from '../../services/api'

//COMPONENTES PADRÃO
import Nav from '../../templates/block/Nav';
import Footer from '../../templates/block/Footer';


export default function Product() {
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [discount, setDiscount] = useState('');
	
	const history = useHistory();
	const token = localStorage.getItem('Token');
    let { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try{
                const prod = await api.get(`products/${id}`);
                setProduct(prod.data);
            }catch(err){
                alert(err);
            }
        }
        fetchData();
    }, [id]);

    useEffect(()=>{
        function handleCategory(){
            if(product.category === 'dog'){
                setCategory("Cães")
            } else if( product.category === 'cat'){
                setCategory("Gatos")
            } else{
                setCategory("Roedores")
            }
        }
        function calcNewPrice(){
            if(product.discount != null){
                setNewPrice((product.price - product.price * (product.discount/100)).toFixed(2));
            }else{
                setNewPrice(product.price)
            }
        }
        function calcDiscount(){
            setDiscount( ((product.discount * product.price)/100).toFixed(2) )
        }
        calcNewPrice();
        calcDiscount();
        handleCategory();
    })

    function handleCart(){
        let cart = [];
        if(localStorage.hasOwnProperty('cart')){
            cart = JSON.parse(localStorage.getItem("cart"))
            if(!cart.find(element => element.productId === product.id)){
                const data = {
                    productId: product.id,
                    cont: 1
                }
                cart = JSON.parse(localStorage.getItem("cart"))
                cart.push(data)
                localStorage.setItem('cart',JSON.stringify(cart))
                alert("Produto adicionado ao seu carrinho")
            }else{
                alert("Produto adicionado ao seu carrinho")
            }
        } else{
            const data = [{
                productId: product.id,
                cont: 1
            }]
            localStorage.setItem('cart',JSON.stringify(data))
            alert("Produto adicionado ao seu carrinho")
        }
    }
	
	function verificaLogin() {
		if(token) {
            handleCart()
			history.push('/cart');
		}
		else {
			history.push('/login');
		}
	}

    return(
      <div className="product">
        <Nav/>
        <div className="product__wrapper">
            <div className="product__first__section">
                <div className="product__image__wrapper"></div>
                <div className="product__description__wrapper">
                    <div className="product__title">{product.name}</div>
                    <div className="product__price">R$ {newPrice}</div>
                    { product.discount>0 && (
                        <div className="product__discount">- R$ {discount}</div>
                    )}
                    <div className="product__description">{product.description}</div>
                    <div className="product__buttons__wrappper">
                        <button className="purple" onClick = {verificaLogin}>COMPRAR AGORA</button>
                        <button className="grey" onClick={handleCart}>ADICIONAR AO CARRINHO</button>
                    </div>
                </div>
            </div>
            <div className="product__middle__section">
                <h3>mais detalhes sobre esse produto</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Peso</td>
                            <td>{product.weight}</td>
                        </tr>
                        <tr>
                            <td>Marca</td>
                            <td>{product.brand}</td>
                        </tr>
                        <tr>
                            <td>Categoria</td>
                            <td>{category}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Footer/>
      </div>
  );
}
