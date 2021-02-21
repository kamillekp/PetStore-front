import React, {useEffect, useState} from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom'

export default function HighlightsCard({product}){
    const history = useHistory();
    const [newPrice, setNewPrice] = useState('');
    const [discount, setDiscount] = useState('');

    useEffect(()=>{
        function calcNewPrice(){
            if(product.discount){
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
    })

    function openProduct(e){
        history.push(`/product/${product.id}`);
    }
    
    return(
        <Link onClick={openProduct}>
            <div className="highlights__card">
                <div className="highlights__card__image">
                    {discount>0 && (
                        <div className="highlights__card__image-discount">- {product.discount}%</div>
                    )}
                </div>
                <div className="highlights__card__description">
                    <div className="highlights__card__description-name"><p>{product.name}</p></div>
                    {discount <= 0 && (
                        <div>
                            <div className="highlights__card__description-big-price">R$ {newPrice}</div>
                        </div>
                    )}
                    
                    {discount>0 && (
                        <div>
                            <div className="highlights__card__description-price">R$ {newPrice}</div>
                            <div className="highlights__card__description-discount">- R$ {discount}</div>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}