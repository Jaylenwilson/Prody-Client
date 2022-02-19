// VIEW ALL MY POST FETCH GOES HERE AND DISPLAY CREATED POST
import React from 'react';
import { SignupProps } from '../../auth/signup';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBCardText, MDBBtn, MDBTable, MDBInput } from 'mdb-react-ui-kit';
import { render } from '@testing-library/react';
import { Container, Row, Col, Card, CardBody, CardText, CardTitle, } from 'reactstrap';
import ReactPlayer from 'react-player';
import Delete from './DeletePost';
import { LoginProps } from '../../auth/login'
import { Props } from '../../App'
import APIURL from '../../helpers/environment';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, } from 'reactstrap';



export interface MyPostProps {
    postId: Props['postId'],
    user: Props['user'],
    setUser: Props['setUser']
    // ViewMyPosts: () => void
}

export interface MyPostState {
    category: string,
    description: string,
    image: string,
    link: string,
    myPosts: string[],
    editActive: boolean
    postId: string
}

export class MyPost extends React.Component<MyPostProps, MyPostState> {
    constructor(props: MyPostProps) {
        super(props)

        this.state = {
            myPosts: [],
            category: '',
            description: '',
            image: '',
            link: '',
            editActive: false,
            postId: ''
        }
        this.handleClick = this.handleClick.bind(this)
        this.ViewMyPosts = this.ViewMyPosts.bind(this)
    }

    handleClick(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }


    editPost = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        //console.log(this.state.postId)
        await fetch(`${APIURL}/posts/edit/${this.props.user}/${this.state.postId}`, {
            method: 'PUT',
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
        this.ViewMyPosts()

    }

    activateEdit = (p: string) => {
        console.log(p)
        this.setState({
            editActive: !this.state.editActive,
            postId: p
        })

    }

    componentDidMount() {
        this.ViewMyPosts()
    }

    closeEdit = () => {
        this.setState({
            editActive: false
        })
    }



    ViewMyPosts = async () => {
        console.log(this.props.user)
        await fetch(`${APIURL}/posts/mypost/${this.props.user}`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("Authorization")}`
            })
        })
            .then(data => data.json())
            .then(data => {
                console.log(data)
                console.log(this.state.myPosts)
                this.setState({
                    myPosts: data.posts,
                    // user: this.props.user
                })


                // console.log(this.state.myPosts)
            })
            .catch((err) => console.log(err))
    }

    // shouldComponentUpdate() {
    //     this.ViewMyPosts()
    // }
    myPostMap = () => {
        return this.state.myPosts?.map((myPosts: any, index: number) => {
            return (
                <MDBCard className="card" key={myPosts.id}  >
                    <MDBCardTitle className="title">{myPosts.category}</MDBCardTitle>
                    <MDBCardBody>
                        <ReactPlayer className="video" url={myPosts.link} />
                        <MDBCardText>{myPosts.description}</MDBCardText>
                        <MDBBtn onClick={() => this.activateEdit(myPosts.id)} >EDIT</MDBBtn>
                        {/* <MDBBtn onClick={this.activateEdit} >EDIT</MDBBtn> */}
                        <Delete user={myPosts.userId} postId={myPosts.id} />
                    </MDBCardBody>

                </MDBCard>

            )
        })
    }



    render(): React.ReactNode {
        return (

            <div>
                <Container>
                    <Row>
                        <Col>
                            {this.myPostMap()}
                        </Col>
                    </Row>
                </Container>
                <div>
                    {this.state.editActive ?
                        <Modal isOpen={this.state.editActive}>
                            <ModalHeader>Edit</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.editPost}>
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
                                    <Button type="submit">Create</Button>
                                    <Button onClick={this.closeEdit}>Cancel</Button>
                                </Form>
                            </ModalBody>
                        </Modal> : null}
                </div>
            </div>
        )
    }

}




export default MyPost