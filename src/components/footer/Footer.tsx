import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__section">
                <div className="footer__section-item footer__informations">
                    <h3 className="footer__title">Kontakt</h3>
                    <p className="footer__info">tel. 530 681 528</p>
                    <p className="footer__info">a.bien2950@gmail.com</p>
                </div>
                <div className="footer__section-item footer__social">
                    <h3 className="footer__title">Media Społecznościowe</h3>
                    <a href="https://www.facebook.com/ola.dziurman" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebookF} className="footer__icon" /></a>
                    <a href="https://animark.pl" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} className="footer__icon" /></a>
                </div>
            </div>
            <div className="footer__section footer__section--center">
                <Link to="/" className="footer__link footer__info">strona główna</Link>
                <Link to="/pictures" className="footer__link footer__info">obrazy</Link>
                <Link to="/collections" className="footer__link footer__info">kolekcje</Link>
                <Link to="/products" className="footer__link footer__info">produkty</Link>
                <Link to="/contact" className="footer__link footer__info">kontakt</Link>
                <Link to="/news" className="footer__link footer__info">nowości</Link>
                <Link to="/privacy-policy" className="footer__link footer__info">polityka prywatności</Link>
            </div>
            <div className="footer__section footer__section--center">
                <p className="footer__copy">Prawa autorskie &copy; Wszelkie prawa zastrzeżone</p>
            </div>
        </footer>
    );
};