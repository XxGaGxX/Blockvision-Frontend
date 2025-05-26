import React, { useContext } from 'react'
import { useState } from 'react';
import './signup.css'
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router';
import CryptoJS from "crypto-js";

  function SignUp() {
    const [isShowed, setisShowed] = useState(false);
    const {setIsLogged} = useContext(AuthContext)
    let Nome = ''
    let Cognome = ''
    let Email = ''
    let Password = ''
    let CheckPassword = ''
    const navigate = useNavigate()
    function handleCheckPassword() {
      setisShowed(!isShowed);
    }

    async function handleSignUp(event) {
      event.preventDefault(); // Impedisce il comportamento predefinito del form

      let Nome = document.getElementById('nome').value;
      let Cognome = document.getElementById('Cognome').value;
      let Email = document.getElementById('Mail').value;
      let Password = document.getElementById('Password').value;
      let CheckPassword = document.getElementById('CheckPassword').value;

      if (Password === CheckPassword) {
        const now = new Date();
        const DataIscrizione = now.toISOString().slice(0, 19).replace('T', ' '); // Formatta come 'YYYY-MM-DD HH:MM:SS'

        Password = CryptoJS.SHA256(Password).toString(CryptoJS.enc.Hex);
        console.log(Password);

        const data = {
          Nome,
          Cognome,
          Email,
          Password,
          DataIscrizione,
        };

        console.log(JSON.stringify(data));

        try {
          const response = await fetch('http://localhost:8090/api/account', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            const result = await response.json();
            console.log(result);
            alert('Registrazione completata con successo!');
            setIsLogged(true)
            navigate('/')
          } else {
            alert('Errore durante la registrazione.');
          }
        } catch (error) {
          console.error(error);
          alert('Errore di rete.');
        }
      } else {
        alert('Le password devono essere identiche');
      }
    }

    return (
      <div>
        <div className="mainDivSignUp">
          <div className="loginDiv">
            <div className="title">
              <h1>Benvenuto su BlockVision</h1>
            </div>
            <form>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  className="form-control"
                  id='nome'
                  aria-describedby="emailHelp"
                />
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Cognome
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Cognome"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Indirizzo Mail
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="Mail"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type={isShowed ? 'text' : 'password'}
                  className="form-control"
                  id="Password"
                />
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Conferma Password
                </label>
                <input
                  type={isShowed ? 'text' : 'password'}
                  className="form-control"
                  id="CheckPassword"
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  onClick={handleCheckPassword}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Mostra Password
                </label>
              </div>
              <div className="divButton">
                <button  className="btn btn-primary" onClick={handleSignUp}>
                  Registrati
                </button>

              </div>
              <div className="loginlink">
                <a href="/login">Sei già registrato?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

export default SignUp
