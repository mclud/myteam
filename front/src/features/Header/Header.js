import React from "react";
import '../Header/Header.css';
import { Link, useHistory } from "react-router-dom";
import store from "../../app/store";

export default function Header() {

    const isLogged = store.getState().appwrap.logged;
    const history = useHistory();

    return(
        <div className="header">
            <div className="bgimg"></div>
            <nav>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/fields">Terrains</Link></li>
                    <li><Link to="/sports">Sports</Link></li>
                    <li><Link to="/teams">Equipes</Link></li>
                    {!isLogged ? <li><Link to="/join">Inscrivez-vous</Link></li> : null}
                    {!isLogged ? <li><Link to="/login">Mon compte</Link></li> : null}
                </ul>
            </nav>
        </div>
    )
}