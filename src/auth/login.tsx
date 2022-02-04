import React from 'react';
import { Navigate } from 'react-router-dom';
import { Props } from '../App';
import { MDBInput, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Signup } from './signup';
import { SignupProps } from './signup'
//! TO DO
// create a button to open signup modal


export type LoginProps = {
    user: string,
    username: string,
    email: string,
    password: string,
    role: string,
    sessionToken: Props['sessionToken'],
    updateToken: Props['updateToken'],
    setSessionToken: Props['setSessionToken'],
    isDisplayed: boolean,
    toggleModal: Props['toggleModal'],
    isOpen: Props['isOpen'],
}


class Login extends React.Component<{ sessionToken: Props['sessionToken'], updateToken: Props['updateToken'], setSessionToken: Props['setSessionToken'], toggleModal: Props['toggleModal'], isOpen: Props['isOpen'] }, LoginProps> {
    constructor(props: LoginProps) {
        super(props)

        this.state = {
            user: '',
            username: '',
            email: '',
            password: '',
            role: '',
            sessionToken: this.props.sessionToken,
            updateToken: this.props.updateToken,
            setSessionToken: this.props.setSessionToken,
            isDisplayed: true,
            toggleModal: this.props.toggleModal,
            isOpen: this.props.isOpen
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

        await fetch(`http://localhost:5000/auth/login`, {
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
                this.props.updateToken(data.sessionToken);
                this.props.setSessionToken(data.sessionToken);
                this.setState({
                    user: data.user.id
                });
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
                <h3>Login</h3>
                <form id="loginform" onSubmit={this.userLogin}>

                    <MDBInput className='mb-4' type='text' name='username' value={this.state.username} onChange={this.handleClick} label='username'></MDBInput>
                    <MDBInput className='mb-4' type='text' name='email' value={this.state.email} onChange={this.handleClick} label='email'></MDBInput>
                    <MDBInput className='mb-4' type='password' name='password' value={this.state.password} onChange={this.handleClick} label='password'></MDBInput>


                    <MDBBtn type='submit'>Sign in</MDBBtn>
                </form>
                <div id='registerButton'>
                    <p>Not a member?</p>
                    <MDBBtn onClick={this.props.toggleModal} type='button'>Sign up</MDBBtn>
                </div>
                <Signup toggleModal={this.props.toggleModal} isOpen={this.props.isOpen} sessionToken={this.props.sessionToken} updateToken={this.props.updateToken} setSessionToken={this.props.setSessionToken} />
            </div>


        )
    }
}
export default Login;