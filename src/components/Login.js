import React, { Component}  from 'react';
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
                    localStorage.setItem('authToken', res.data.accessToken);
                    localStorage.setItem('username', JSON.stringify(res.data.username));
                    console.log(localStorage.getItem('authToken'));
                    this.props.navigate('/')
                    window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
    }

    cancel = (e) => {
        this.props.navigate('/')
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                <br/> <br/>
                <div className='card-body'>
                <form>

                    <div className='form-group'>
                    <label>Username :</label>
                    <input placeholder='Username' name="userName" className='form-control'
                                            value={this.state.userName} onChange={this.changeNameHandler}/>

                    </div>
                    <div className='form-group'>
                    <label>Password :</label>
                    <input placeholder='password' name="password" className='form-control'
                                            value={this.state.password} onChange={this.changePasswordHandler}/>

                    </div>
                    <div className='form-group'>
                        <button className='btn btn-success' onClick={this.loginHandle}>Login</button>
                        <button className='btn btn-danger' onClick={this.cancel} style={{marginLeft: "10px"}}>Cancel</button>
                    </div>
                </form>
                </div>
                </div>
                </div>
            </div>
            
        );
    }
}

Login.propTypes = {

};

export default WithRouter(Login);