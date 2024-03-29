import React from 'react';
import { Navigate } from 'react-router-dom';
import { Props } from '../App';
import { MDBInput, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Signup } from './signup';
import { SignupProps } from './signup';
import { LandingProps } from './landing';
import APIURL from '../helpers/environment';
//! TO DO
// create a button to open signup modal


export type LoginProps = {
    setUser: Props['setUser'],
    user: Props['user'],
    sessionToken: Props['sessionToken'],
    updateToken: Props['updateToken'],
    setSessionToken: Props['setSessionToken'],
    toggleModal: Props['toggleModal'],
    isOpen: Props['isOpen'],
    closeModal: Props['closeModal'],
    username: Props['username'],
    setUsername: Props['setUsername']
    role: Props['role']
    setRole: Props['setRole']
}

export type LoginState = {
    user: string,
    username: string,
    email: string,
    password: string,
    role: string,
    sessionToken: string,
    updateToken: string,

}


class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props)

        this.state = {
            user: "",
            username: '',
            email: '',
            password: '',
            role: '',
            sessionToken: "",
            updateToken: "",

        }

        this.handleClick = this.handleClick.bind(this);
        this.userLogin = this.userLogin.bind(this);
    }

    handleClick(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    };

    userLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        await fetch(`${APIURL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                user: { username: this.state.username, email: this.state.email, password: this.state.password }
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then(data => {
                console.log(data);
                if (data.user) {
                    this.props.setSessionToken(data.sessionToken);
                    this.props.updateToken(data.sessionToken, data.user.username, data.user.role);
                    this.props.setUser(data.user.id);
                    // this.props.setUsername(data.user.username)
                }
            })

    };

    // toggleModal = () => {
    //     this.setState({
    //         isOpen: true
    //     })
    // }



    render(): React.ReactNode {
        return (
            <div>
                <h1>Prody</h1>
                <div id="login">
                    <h3>Login</h3>
                    <form id="loginform" onSubmit={this.userLogin}>

                        <MDBInput required max="8" min="6" className='mb-4' type='text' name='username' value={this.state.username} onChange={this.handleClick} label='username' ></MDBInput>
                        <MDBInput required max="8" min="6" className='mb-4' type='text' name='email' value={this.state.email} onChange={this.handleClick} label='email'></MDBInput>
                        <MDBInput required max="8" min="6" className='mb-4' type='password' name='password' value={this.state.password} onChange={this.handleClick} label='password'></MDBInput>

                        <MDBBtn type='submit'>Sign in</MDBBtn>
                        {this.state.user !== "" && <Navigate to='/home' />}

                    </form>
                </div>
                <div id='registerbutton'>
                    <p>Not a member?</p>
                    <MDBBtn onClick={this.props.toggleModal} type='button'>Sign up</MDBBtn>
                    {this.props.user !== "" && <Navigate to='/home' />}

                </div>

                <div id="signupbtn">
                    <Signup role={this.props.role} setRole={this.props.setRole} username={this.props.username} setUsername={this.props.setUsername} setUser={this.props.setUser} user={this.props.user} closeModal={this.props.closeModal} toggleModal={this.props.toggleModal} isOpen={this.props.isOpen} sessionToken={this.props.sessionToken} updateToken={this.props.updateToken} setSessionToken={this.props.setSessionToken} />
                </div>

            </div>


        )
    }
}
export default Login;