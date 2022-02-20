import React from 'react';
import { Navigate } from 'react-router-dom';
import { Props } from '../App';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, } from 'reactstrap';
import { MDBIcon } from 'mdb-react-ui-kit'
import LoginProps from './login'
import { MDBBtn } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import APIURL from '../helpers/environment';

// set user state here 
export interface SignupProps {
    user: Props['user'],
    sessionToken: Props['sessionToken'],
    updateToken: Props['updateToken'],
    setSessionToken: Props['setSessionToken']
    isOpen: Props['isOpen'],
    toggleModal: Props['toggleModal'],
    closeModal: Props['closeModal'],
    setUser: Props['setUser'],
    username: Props['username'],
    setUsername: Props['setUsername']

}

export interface SignUpState {
    username: string,
    email: string,
    password: string,
    role: string,
    user: string,
    isOpen: boolean,
    sessionToken: string,
    updateToken: string,
    toggleModal: Props['toggleModal'],
    closeModal: Props['closeModal']
}

export class Signup extends React.Component<SignupProps, SignUpState> {
    constructor(props: SignupProps) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            role: '',
            user: '',
            // toggleModal: (isOpen: boolean) => { false },
            sessionToken: "",
            updateToken: "",
            isOpen: this.props.isOpen,
            toggleModal: this.props.toggleModal,
            closeModal: this.props.toggleModal,
        }
        this.handleClick = this.handleClick.bind(this);
        // this.userSignup = this.userSignup.bind(this);
        // this.toggleModal = this.toggleModal.bind(this);
        // this.closeModal = this.closeModal.bind(this);
    }

    handleClick(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    };


    // toggleModal = () => {
    //     this.setState(state => ({ isDisplayed: !state.isDisplayed }))
    // };

    userSignup = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        await fetch(`${APIURL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({
                users: {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    role: this.state.role
                }
            }),

            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                // this.props.updateToken(data.sessionToken);
                // this.props.setSessionToken(data.sessionToken);
                if (json.user) {
                    this.props.setSessionToken(json.sessionToken);
                    this.props.updateToken(json.sessionToken);
                    this.props.setUser(json.user.id);
                    this.props.setUsername(json.user.username);
                }
            })
            .catch(err => console.log(err))
    }




    // toggleModal(e: React.ChangeEvent<Modal>) {
    //     this.setState({
    //         isOpen: true
    //     })
    // }



    render(): React.ReactNode {
        return (
            <div id="modal">
                <Modal isOpen={this.props.isOpen} >
                    <div id="modalbtn">
                        <ModalHeader id="modalhead" >Sign Up </ModalHeader>
                        <MDBBtn id="btn" onClick={this.props.closeModal}><FontAwesomeIcon icon={faTimes} fa-2x /></MDBBtn>
                    </div>
                    <ModalBody closeModal={this.props.closeModal}>
                        <Form onSubmit={this.userSignup} >
                            <FormGroup>
                                <Label>Enter a Username</Label>
                                <Input name='username' type='text' value={this.state.username} onChange={this.handleClick} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Enter your email</Label>
                                <Input name='email' type='text' value={this.state.email} onChange={this.handleClick} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Create a password</Label>
                                <Input name='password' type='text' value={this.state.password} onChange={this.handleClick} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Select a role</Label>
                                <Input type='select' name='role' value={this.state.role} onChange={this.handleClick}>
                                    <option value="admin">Admin</option>
                                    <option value="Instructor">Instructor</option>
                                    <option value="Student">Student</option>
                                </Input>
                            </FormGroup>
                            <Button onClick={this.props.closeModal} type='submit' >Sign up!</Button>
                        </Form>
                    </ModalBody>
                    {localStorage.getItem("sessionToken") && <Navigate to='/home' />}
                </Modal>
            </div>
        )
    }
}
export default Signup