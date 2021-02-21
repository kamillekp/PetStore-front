import React, { useRef, useState } from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

//COMPONENTES PADRÃO
import Nav from '../../templates/block/Nav';
import Footer from '../../templates/block/Footer';

export default function Register() {
  const [name, setName]  = useState('');
  const [password, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [n, sN] = useState(false)
  const [m, sM] = useState(false)
  const [p, sP] = useState(false)

  var reName, reMail, rePassword

  const history = useHistory();

  const nameInputRef = useRef(null)
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)

  async function handleSignUp(e) {
    e.preventDefault();
    handleName();
    handleEmail();
    handlePassword();
    if(reName && reMail && rePassword){
      try {
        const data = {
          name,
          email,
          password
        } 
        await axios.post('http://localhost:3333/user', data);
        history.push('login')
      }
      catch (err) {
        document.getElementById("msg").innerHTML="<font>Ocorreu um erro. Tente novamente </font>";
      }
    }else{
      document.getElementById("msg").innerHTML="<font>Dados inválidos para o cadastro. </font>";
    }
  }

  function handleEmail(){
    const patternMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    reMail = patternMail.test(String(email).toLowerCase());
    if(reMail) {
      document.getElementById("msgemail").innerHTML="";
      document.getElementById("email").style.border= '1px solid green';
      reMail = true
    }
    else{
      document.getElementById("msgemail").innerHTML="<font color='red'>E-mail inválido </font>";
      document.getElementById("email").style.border= '1px solid tomato';
      reMail = false
    }
  }

  function handleName(){
    const patternName = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
    reName = patternName.test(String(name).toLowerCase());
    if(reName) {
      document.getElementById("msgname").innerHTML="";
      document.getElementById("name").style.border= '1px solid green';
      reName = true
    }else{
      document.getElementById("msgname").innerHTML="<font color='red'>Nome inválido </font>";
      document.getElementById("name").style.border= '1px solid tomato';
      nameInputRef.current.style.border="1px solid tomato"
      reName = false
    }
  }

  function handlePassword(){
    const patternPassword = /(.|\s)*\S(.|\s)*/;
    rePassword = patternPassword.test(String(password).toLowerCase())
    if(rePassword){
      document.getElementById("msgpassword").innerHTML="";
      document.getElementById("password").style.border= '1px solid green';
      rePassword = true
    }else{
      document.getElementById("msgpassword").innerHTML="<font color='red'>Senha inválida </font>";
      document.getElementById("password").style.border= '1px solid tomato';
      rePassword = false
    }
  }

  return(
      <div className="register">
        <Nav/>
        <div className="centered__form__wrapper">
            <div className="centered__form">
                <h3>preencha com seus dados</h3>
                <label>Nome completo</label>

                <input id="name" placeholder="Nome" type="text"
                  value={name}
                  onBlur={handleName}
                  onChange={e => setName(e.target.value)}
                  ref={nameInputRef}/>
                  <span id="msgname" className="validationInputMessage"/>

                <label>Email</label>
                <input id="email"  placeholder="nome@email.com" type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onBlur={handleEmail}
                  ref={emailInputRef}/>
                <span id="msgemail" className="validationInputMessage"/>

                <label>Senha</label>
                <input id="password" type="password" placeholder="• • • • • • • • •"
                  value={password}
                  onChange={e => setPass(e.target.value)}
                  onBlur={handlePassword}
                  ref={passwordInputRef}/>
                <span id="msgpassword" className="validationInputMessage"/>

                <button className="purple" onClick = {handleSignUp}>CADASTRAR-SE</button>
                <span className="validation__message" id="msg"/>
                <Link to="/login" className="highlighted-link">Já possui uma conta? entre aqui</Link>
            </div>
        </div>
        <Footer/>
      </div>
  );
}
