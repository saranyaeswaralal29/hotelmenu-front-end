import React, { Component} from 'react';
import {NavLink } from 'react-router-dom';

class HeaderComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn: false
        }
        this.logoutHandle = this.logoutHandle.bind(this);
    }

    logoutHandle = (e) => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        this.setState({isLoggedIn: false});
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div>
                            <a className="navbar-brand">Hunt Your Hunger</a>
                            { localStorage.getItem('username') === null
                                ? <NavLink to="/login" className="btn btn-info">Login</NavLink>
                                : <NavLink to="/" onClick={this.logoutHandle} className="btn btn-info">Log out</NavLink>
                            }
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;