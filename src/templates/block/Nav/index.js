import './styles.css';
import {FiShoppingCart, FiLogOut, FiLogIn} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import { useEffect, useState } from 'react';

export default function Nav() {
  const token = localStorage.getItem('Token');
  const [verifica, setVerifica] = useState('');
  const history = useHistory();

  useEffect (() => {
    function verifyToken () {
      if(token) {
        setVerifica(true);
      }
      else {
        setVerifica(false);
      }
    }
    verifyToken();
  });

  function logout () {
    localStorage.clear();
    history.push('/');
  }

  return(
    <div className="nav">
        <Link to="/"> <div className="nav__title">KATS</div></Link>
        <div className="nav__list">
            <Link to="/products/dog"> <li>cães</li> </Link>
            <Link to="/products/cat"> <li>gatos</li> </Link>
            <Link to="/products/rodent"> <li>roedores</li> </Link>
        </div>
        <div className="nav__list">
            <Link to="/cart"><li> <FiShoppingCart size="13px" /> carrinho</li></Link>

            {verifica === true && (
                <Link to="/" onClick = {logout}> <li> <FiLogOut size="13px"/> sair</li></Link>
            )}
            {verifica === false && (
                <Link to="/login"> <li> <FiLogIn size="13px"/> entrar</li></Link>
            )}
        </div>
    </div>
  );
}
