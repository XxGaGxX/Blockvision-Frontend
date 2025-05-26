import React, { useContext, useState } from 'react';
import './login.css';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router';
import { AuthContext } from '../auth/AuthContext';

export default function Login() {
  const [isShowed, setisShowed] = useState(false);
  const { setIsLogged } = useContext(AuthContext)
  const navigate = useNavigate()
  let emailForm = ''
  let passwordForm = ''

  function handleCheckPassword() {
      setisShowed(!isShowed);
  }

  async function handleSignIn(event) {
    event.preventDefault()
    
    emailForm = document.getElementById("exampleInputEmail1").value
    passwordForm = document.getElementById("exampleInputPassword1").value
    // alert(`${emailForm} ${passwordForm}`)
    if (emailForm == '' || passwordForm == '') {
      alert('Riempire tutti i campi')
    } else {
      passwordForm = CryptoJS.SHA256(passwordForm).toString(CryptoJS.enc.Hex);
      const data = {
        emailForm,
        passwordForm
      }
      
      try {
        const response = await fetch('http://localhost:8090/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        const data1 = await response.json()
        console.log(data1)
        
        console.log(data1[0][0].Password)
        

        if (data1[0][0].Password == passwordForm) {
          setIsLogged(true)
          navigate('/')

        } else {
          alert('password errata')
        }
        
      } catch (error) {
        console.log(error)
      }
      
    }
  }

  return (
    <div>
      <div className="mainDivLogin">
        <div className="loginDiv">
          <div className="title">
            <h1>Accedi a BlockVision</h1>
          </div>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type={isShowed ? 'text' : 'password'}
                className="form-control"
                id="exampleInputPassword1"
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
                Show Password
              </label>
            </div>
            <div className="divButton">
              <button type="submit" className="btn btn-primary" onClick={handleSignIn}>
                Submit
              </button>
              
            </div>
            <div className="signuplink">
              <a href="/signup">Non sei registrato?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}