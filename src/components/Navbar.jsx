import './Navbar.css';
import { Person, PersonFill } from 'react-bootstrap-icons';
import { AuthContext } from '../auth/AuthContext';
import { useContext } from 'react';
import { useLocation } from 'react-router';


function Navbar() {
    const location = useLocation();
    const { isLogged } = useContext(AuthContext);
    const { setIsLogged } = useContext(AuthContext);



    return (
        <nav style={{ height: "76px" }} className="navbar navbar-default navbar-expand-lg" >
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img
                        src='../../public/logo.png'
                        alt="Bootstrap"
                        width={150}
                        height={60}
                    />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/crypto">
                                Crypto
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/nft/collections">
                                NFT
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/news">
                                News
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/contacts">
                                Contacts
                            </a>
                        </li>

                        {isLogged ? (
                            <li className="nav-item dropdown last">
                                <a
                                    className="nav-link"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <PersonFill className="nav-icon" />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/login" onClick={() => { setIsLogged(false) }}>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li className='nav-item last'>
                                <a className="nav-link" aria-disabled="true" href='/login'>
                                    <PersonFill className='nav-icon' />
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav >
    );

 
}

export default Navbar;