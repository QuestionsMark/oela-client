import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__section footer__informations">
                <h3 className="footer__title">Kontakt</h3>
                <p className="footer__info">tel. 530 681 528</p>
                <p className="footer__info">a.bien2950@gmail.com</p>
                <div className="footer__links">
                    <Link to="/privacy-policy" className="footer__link footer__info">polityka prywatności</Link>
                    <p className="footer__copy">Prawa autorskie &copy; Wszelkie prawa zastrzeżone</p>
                </div>
            </div>
            <div className="footer__section footer__social">
                <h3 className="footer__title">Media Społecznościowe</h3>
                <a href="https://www.facebook.com/ola.dziurman" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebookF} className="footer__icon" /></a>
                <a href="https://animark.pl" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} className="footer__icon" /></a>
            </div>
        </footer>
    );
};