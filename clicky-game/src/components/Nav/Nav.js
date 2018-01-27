import React from 'react';
import './Nav.css';

const Nav = props => (
    <nav>
        <ul>
            <li className="brand">Clicky Game</li>
            <li>Click on an image to begin!</li>
            <li>Current Score: {props.score} | Highest Score: {props.highScore}  </li>
        </ul>
    </nav>
);


export default Nav;