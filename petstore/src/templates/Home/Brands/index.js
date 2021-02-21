import React from 'react';
import './styles.css';

import birbo from '../../../assets/birbo.png';
import elanco from '../../../assets/elanco.png';
import hercosul from '../../../assets/hercosul.png';
import pedigree from '../../../assets/pedigree.png';

export default function Brands() {
  return(
    <div className="brands">
        <img src={birbo} alt="Logo da marca Birbo"/>
        <img src={elanco} alt="Logo da marca Elanco"/>
        <img src={hercosul} alt="Logo da marca hercosul"/>
        <img src={pedigree} alt="Logo da marca Pedigree"/>
    </div>
  )
}