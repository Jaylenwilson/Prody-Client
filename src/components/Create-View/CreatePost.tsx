// CREATE POST FETCH GOES HERE
// SENT T APP.TSX
// CREATE BUTTON TO BE DISPLAYED IN APP.TSX
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Props } from '../../App';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import App from '../../App';
import { faVestPatches } from '@fortawesome/free-solid-svg-icons';
import APIURL from '../../helpers/environment'
import * as FaIcons from 'react-icons/fa';

export interface CreatePostProps {
    sessionToken: Props['sessionToken'],
    setPostId: Props['setPostId']
    postId: Props['postId'],
    isOpen: Props['isOpen'],
    toggleModal: Props['toggleModal'],
    closeModal: Props['closeModal']
    ViewPost: () => void
}

export interface CreatePostState {
    category: string,
    description: string,
    image: string,
    link: string,
    user: string,
    postId: string,
    closeModal: Props['closeModal']
}

export class CreateP extends React.Component<CreatePostProps, CreatePostState> {
    constructor(props: CreatePostProps) {
        super(props)

        this.state = {
            category: '',
            description: '',
            image: '',
            link: '',
            user: '',
            postId: '',
            closeModal: this.props.closeModal
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

        await fetch(`${APIURL}/posts/post`, {
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
                Authorization: `${localStorage.getItem("Authorization")}`
            })
        })

            .then(data => data.json())
            .then(data => {
                console.log(data);
                this.props.setPostId(data.post.id)
                this.props.ViewPost()

            })
            .catch((err) => console.log(err))
        console.log(this.props.sessionToken)

    }















    render(): React.ReactNode {
        return (
            <div>
                <Modal isOpen={this.props.isOpen}>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalBody >
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

                            <Button onClick={this.props.closeModal} type='submit'><FaIcons.FaPlus /></Button>
                            <Button onClick={this.props.closeModal}>cancel</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default CreateP