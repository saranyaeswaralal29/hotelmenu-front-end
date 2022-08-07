import React, { Component } from 'react';
import {NavLink } from 'react-router-dom';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
           
        }

    }
    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div>
                            <a className="navbar-brand">Hotel Menu Application</a>
                            <NavLink to="/login">Login</NavLink>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;