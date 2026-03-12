import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className="header">
            <div className="logo-container">
                <Link to="/" onClick={closeMenu}>
                    <div className="f1-logo">
                        <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.5 2.5H0.5V27.5H28.5" stroke="#E10600" strokeWidth="5" />
                            <path d="M10.5 15.5H23.5" stroke="#E10600" strokeWidth="5" />
                            <text x="35" y="25" fill="#E10600" fontFamily="Arial" fontWeight="bold" fontSize="24">F1</text>
                        </svg>
                        <span className="logo-text">Universe</span>
                    </div>
                </Link>
            </div>

            <button className="hamburger" onClick={toggleMenu} aria-label="Toggle Navigation">
                {isOpen ? <FaTimes /> : <FaBars />}
            </button>

            {isOpen && <div className="overlay" onClick={closeMenu}></div>}

            <nav className={`navbar ${isOpen ? 'active' : ''}`}>
                <ul className="nav-links">
                    <li><Link to="/home" className="nav-link" onClick={closeMenu}>Home</Link></li>
                    <li><Link to="/drivers" className="nav-link" onClick={closeMenu}>Drivers</Link></li>
                    <li><Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link></li>
                    <li><Link to="/news" className="nav-link" onClick={closeMenu}>News & RSS</Link></li>
                    <li><Link to="/#forum" className="nav-link" onClick={closeMenu}>Forum</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
