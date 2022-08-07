import React, { Component, useState }  from 'react';
import {WithRouter} from '../components/WithRouter';
import LoginService from '../services/LoginService';

class Login extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            userName : '',
            password: ''
        }

        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.loginHandle = this.loginHandle.bind(this);
    }

    changeNameHandler = (event) => {
        this.setState({userName: event.target.value});
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    loginHandle = (e) => {
        e.preventDefault();
        let loginCredentials = {username:this.state.userName, password: this.state.password};
        console.log("login credentials =>"  + JSON.stringify(loginCredentials));
            LoginService.loginApi(loginCredentials).then(res => {
                // set the token and user from the session storage
                    sessionStorage.setItem('token', res.data.accessToken);
                    sessionStorage.setItem('username', JSON.stringify(res.data.username));
                    console.log(res.data.accessToken);
                this.props.navigate('/')
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                Login <br/> <br/>
                <div className='card-body'>
                <form>

                    <div className='form-group'>
                    <label>Username  :</label>
                    <input placeholder='Username' name="userName" className='form-control'
                                            value={this.state.userName} onChange={this.changeNameHandler}/>

                    </div>
                    <div className='form-group'>
                    <label>Password  :</label>
                    <input placeholder='password' name="password" className='form-control'
                                            value={this.state.password} onChange={this.changePasswordHandler}/>

                    </div>
                    <div className='form-group'>
                        <button className='btn btn-success' onClick={this.loginHandle}>Login</button>
                    </div>
                </form>
                </div>
            </div>
            
        );
    }
}

Login.propTypes = {

};

export default WithRouter(Login);