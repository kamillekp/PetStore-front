import React, {useState} from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

//COMPONENTES PADRÃO
import Nav from '../../templates/block/Nav';
import Footer from '../../templates/block/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  const history = useHistory();

  async function handlleLogin (e) {
    e.preventDefault();
    try {
        const data = {
          email,
          password
        } 

        const response = await axios.post('http://localhost:3333/session', data);
        localStorage.setItem('Token', response.data.token);
        localStorage.setItem('UserId', response.data.id);
        history.push('/');
    }
    catch (err) {
      document.getElementById("msg").innerHTML="<font>E-mail ou senha inválidos </font>";
    }
  }

  return(
      <div className="login">
        <Nav/>
        <div className="centered__form__wrapper">
            <div className="centered__form">
                <h3>entre com seus dados</h3>
                <label for="email">Email</label>
                <input id="email"  placeholder="nome@email.com" type="text" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}/>

                <label for="password">Senha</label>
                <input id="password" type="password" placeholder="• • • • • • • • •" 
                  value={password}
                  onChange={e => setPass(e.target.value)}/>
                
                <button className="purple" onClick = {handlleLogin}>ENTRAR</button>
                
                <span className="validation__message" id="msg"/>
                <Link to="/register" className="highlighted-link">Não possui uma conta? cadastre-se aqui</Link>
            </div>
        </div>
        <Footer/>
      </div>
  );
}
