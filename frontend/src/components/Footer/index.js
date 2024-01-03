import './footer.css';

const Footer = () => {

    return (
        <footer>
            <div className="credits">
                <p>Created by Edith Gomez Garcia</p>
                <ul className="icons">
                    <li><a target="_blank" href='https://www.linkedin.com/in/edithgomezgarcia/'><i className="fab fa-linkedin"></i></a></li>
                    <li><a target="_blank" href='https://github.com/egg-chicken'><i className="fab fa-github"></i></a></li>
                    <li><a href="mailto: ggarcia.edith@gmail.com" className="icon solid fas fa-envelope"></a></li>
                </ul>
            </div>
        </footer>
    )
};

export default Footer;
