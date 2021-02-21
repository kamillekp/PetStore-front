import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom'

//COMPONENTES PADRÃO
import Nav from '../../templates/block/Nav';
import Footer from '../../templates/block/Footer';


export default function Error() {
  return(
      <div className="error">
        <Nav/>
        <div className="centered__form__wrapper">
            Oops, essa  página não existe :(
        </div>
        <Footer/>
      </div>
  );
}
