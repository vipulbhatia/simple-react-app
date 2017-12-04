import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';

export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="side-menu">
                <h1>Side Menu</h1>
                <ul>
                    <li className={this.props.screenIndex === 1 ? 'active' : ''}>
                        <Link to="/home">
                            <span><Glyphicon glyph={'home'}/></span>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li className={this.props.screenIndex === 2 ? 'active' : ''}>
                        <Link to="/about">
                            <span><Glyphicon glyph={'home'}/></span>
                            <span>About</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}
