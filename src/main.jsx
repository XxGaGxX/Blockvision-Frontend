import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Navbar from './components/Navbar.jsx'
import './index.css'
import { BrowserRouter, Route, Routes, useLocation } from "react-router"
import HomePage from './components/HomePage.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Crypto from './components/Crypto.jsx'
import News from './components/News.jsx'
import Contacts from './components/contacts.jsx'
import CryptoPage from './components/CryptoCoinPage.jsx'
import NftList from './components/NftList.jsx'
import { AuthProvider } from './auth/AuthContext.jsx'
import Nft from "./components/Nft.jsx";
import NftCollection from './components/NftCollection.jsx'
import contacts from './components/contacts.jsx'
import "bootstrap-icons/font/bootstrap-icons.css"

// import { AuthContext } from '../auth/AuthContext'
// import { useContext } from 'react'

function MainApp() {
  const location = useLocation();

  const noNavbarRoutes = ['/login', '/signup'];

  return (
    <div className="mainDiv">
      <AuthProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/news' element={<News />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/crypto' element={<Crypto />}></Route>
          <Route path='/contacts' element={<Contacts />}></Route>
          <Route path='/crypto/:coinName' element={<CryptoPage />}></Route>
          <Route path='/nft/collections' element={<NftList />}></Route>
          <Route path='/nft/collections/:nftName' element={<NftCollection />}></Route>
          <Route path='/nft/:contract/:id' element={<Nft />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <MainApp />
  </BrowserRouter>,
);