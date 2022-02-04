import React from 'react';
import { Navigate } from 'react-router-dom';
import { Props } from '../App';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import LoginProps from './login'


export interface SignupProps {
    username: string,
    email: string,
    password: string,
    role: string,
    user: string,
    sessionToken: Props['sessionToken'],
    updateToken: Props['updateToken'],
    setSessionToken: Props['setSessionToken']
    isDisplayed: boolean,
    isOpen: Props['isOpen'],
    toggleModal: Props['toggleModal']
}

export class Signup extends React.Component<{ sessionToken: Props['sessionToken'], updateToken: Props['updateToken'], setSessionToken: Props['setSessionToken'], isOpen: Props['isOpen'], toggleModal: Props['toggleModal'] }, SignupProps> {
    constructor(props: SignupProps) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            role: '',
            user: '',
            // toggleModal: (isOpen: boolean) => { false },
            sessionToken: this.props.sessionToken,
            updateToken: this.props.updateToken,
            setSessionToken: this.props.setSessionToken,
            isDisplayed: true,
            isOpen: this.props.isOpen,
            toggleModal: this.props.toggleModal
        }
        this.handleClick = this.handleClick.bind(this);
        // this.userSignup = this.userSignup.bind(this);
        // this.toggleModal = this.toggleModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

        await fetch('http://localhost:5000/auth/register', {
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
                this.setState({
                    user: json.user.id
                });
                this.props.updateToken(json.sessionToken);
            })
            .catch(err => console.log(err))
    }

    closeModal(e: React.ChangeEvent<ModalHeader>) {
        if (this.state.user !== '') {
            <Navigate to='/home' />
        }
    }

    // toggleModal(e: React.ChangeEvent<Modal>) {
    //     this.setState({
    //         isOpen: true
    //     })
    // }



    render(): React.ReactNode {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} >
                    <ModalHeader closeModal={this.closeModal}>Sign Up</ModalHeader>
                    <ModalBody>
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
                            <Button type='submit' >Sign up!</Button>
                        </Form>

                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
export default Signup