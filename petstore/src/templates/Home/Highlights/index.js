import React from 'react';
import './styles.css';

import Card from '../HighlightCard'

export default function Highlights({list}) {
  return(
    <div className="highlights">
      {list.map (item => 
        <Card product={item}/>  
      )}
    </div>
  )
}