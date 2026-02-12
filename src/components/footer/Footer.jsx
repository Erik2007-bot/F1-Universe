import { FaGithub, FaFigma } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="footer-brand">F1 Universe</h3>
                    <p className="footer-tagline">Tu universo de Fórmula 1</p>
                    <div className="social-links">
                        <a href="https://github.com/Erik2007-bot" target="_blank" rel="noreferrer" aria-label="GitHub">
                            <FaGithub size={24} />
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Explorar</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/drivers">Pilotos</Link></li>
                        <li><Link to="/contact">Contacto</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Legal</h4>
                    <ul className="footer-legal">
                        <li><Link to="/legal">Política de Privacidad y Cookies</Link></li>
                        <li><Link to="/legal">Condiciones de Venta</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026  - Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
