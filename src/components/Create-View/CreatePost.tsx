// CREATE POST FETCH GOES HERE
// SENT T APP.TSX
// CREATE BUTTON TO BE DISPLAYED IN APP.TSX
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Props } from '../../App';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import App from '../../App';
import { faVestPatches } from '@fortawesome/free-solid-svg-icons';

export interface CreatePostProps {
    sessionToken: Props['sessionToken'],
    category: string,
    description: string,
    image: string,
    link: string,
    user: string,
    postId: string,
    isOpen: Props['isOpen'],
    toggleModal: Props['toggleModal'],
    closeModal: Props['closeModal']
}

export class CreateP extends React.Component<{ sessionToken: Props['sessionToken'], isOpen: Props['isOpen'], toggleModal: Props['toggleModal'], closeModal: Props['closeModal'] }, CreatePostProps> {
    constructor(props: CreatePostProps) {
        super(props)

        this.state = {
            category: '',
            description: '',
            image: '',
            link: '',
            sessionToken: this.props.sessionToken,
            user: '',
            postId: '',
            isOpen: this.props.isOpen,
            toggleModal: this.props.toggleModal,
            closeModal: this.props.toggleModal
        }
        this.handleClick = this.handleClick.bind(this);
        this.createPost = this.createPost.bind(this);
    }

    handleClick(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    };

    createPost = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        await fetch(`http://localhost:5000/posts/post`, {
            method: 'POST',
            body: JSON.stringify({
                posts: {
                    category: this.state.category,
                    description: this.state.description,
                    image: this.state.image,
                    link: this.state.link
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                authorization: `Bearer ${this.props.sessionToken}`
            })
        })
            .then(data => data.json())
            .then(data => {
                console.log(data);
                this.setState({
                    postId: data.posts.id
                })
            })
            .catch((err) => console.log(err))
    }














    render(): React.ReactNode {
        return (
            <div>
                <Modal isOpen={this.props.isOpen}>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalBody closeModal={this.props.closeModal}>
                        <Form onSubmit={this.createPost}>
                            <FormGroup>
                                <Label>Category</Label>
                                <Input name='category' type='text' value={this.state.category} onChange={this.handleClick}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input name='description' type='textarea' value={this.state.description} onChange={this.handleClick}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Image</Label>
                                <Input name='image' type='url' value={this.state.image} onChange={this.handleClick}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Link</Label>
                                <Input name='link' type='url' value={this.state.link} onChange={this.handleClick}></Input>
                            </FormGroup>

                            <Button type='submit'>Create</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default CreateP