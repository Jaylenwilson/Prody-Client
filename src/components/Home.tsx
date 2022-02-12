import React from 'react';
import CreatePost from './Create-View/CreatePost';
import App from '../App';
import { Props } from '../App';
import { Container, Row, Col, Card, CardBody, CardText, CardTitle, } from 'reactstrap';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBCardText, MDBBtn, MDBTable, MDBInput } from 'mdb-react-ui-kit';
import ReactPlayer from 'react-player';
import CreateCom from './Comments/CreateComment';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, } from 'reactstrap';
import SideBar from '../sidebar/SideBar'
import Delete from '../components/Create-View/DeletePost';
import { LoginProps } from '../auth/login';
import { posix } from 'path/posix';
import APIURL from '../helpers/environment';
//! TO DO
// get post id in comment created response
//add close comment modal and post modal 
// change default of post modal to false


export interface HomeProps {
    sessionToken: Props['sessionToken'],
    isOpen: Props['isOpen'],
    toggleModal: Props['toggleModal'],
    closeModal: Props['closeModal'],
    user: Props['user'],
    setPostId: Props['setPostId']
    postId: Props['postId']
}

export interface HomeState {
    posts: string[],
    commentActive: boolean,
    content: string,
    commentId: string,
    postId: string,
    isOpen: boolean
}

export class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props)

        this.state = {
            isOpen: this.props.isOpen,
            posts: [],
            commentActive: false,
            content: "",
            commentId: "",
            postId: "",
        }
        this.createComment = this.createComment.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.ViewPost()
    }

    ViewPost = async () => {
        await fetch(`${APIURL}/posts/postinfo`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("Authorization")}`
            })
        })
            .then(data => data.json())
            .then(data => {
                console.log(data.posts[0].id)
                console.log(data)
                this.setState({ posts: data.posts, })
            })
            .catch((err) => console.log(err))

    }

    activateComment = (p: string) => {
        console.log(p)
        this.setState({
            commentActive: !this.state.commentActive,
            postId: p
        })
    }



    // add ternary for if comments show or not

    postMap = () => {
        return this.state.posts?.map((posts: any, index: number) => {
            console.log('MAP', posts.id)
            console.log('COMMENTS', posts.comments)
            return (
                <MDBCard className="card" key={posts.id}>
                    <MDBCardTitle className="title">{posts.category}</MDBCardTitle>
                    <MDBCardBody>
                        <ReactPlayer className="video" url={posts.link} />
                        <MDBCardText>{posts.description}</MDBCardText>
                        {posts.comments.map((c: any, index: number) => {
                            console.log(typeof c.content)
                            return (
                                <div className="commentcontent" key={index} >
                                    <p >{c.content}</p>
                                </div>
                            )
                        })}
                    </MDBCardBody>

                    <MDBBtn onClick={() => this.activateComment(posts.id)} postId={posts.id}>Comment</MDBBtn>
                </MDBCard>

            )
        })
    }



    createComment = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(this.state)
        console.log(e)
        await fetch(`http://localhost:5000/comments/comment`, {
            method: 'POST',
            body: JSON.stringify({
                comments: {
                    content: this.state.content,
                    // commentId: this.state.commentId,
                    postId: this.state.postId
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
                this.setState({
                    commentId: data.comment.id,
                    // postId: this.state.postId,

                })
            })
    }



    render(): React.ReactNode {
        return (
            <div id="viewwrapper">
                <Container id="homecontainer">
                    <Row>
                        <Col>
                            {this.postMap()}

                        </Col>
                    </Row>
                    {this.state.commentActive ?

                        <Modal isOpen={this.state.commentActive}>
                            <ModalHeader>Comment</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.createComment}>
                                    <FormGroup>
                                        <Label>Create a Comment</Label>
                                        <Input id="comment" type="text" name="content" value={this.state.content} onChange={this.handleClick} label="comment" />
                                    </FormGroup>
                                    <Button type="submit">Create</Button>
                                </Form>
                            </ModalBody>


                        </Modal> : null}
                </Container>
                <div >
                    <MDBBtn onClick={this.props.toggleModal}>Create</MDBBtn>
                    <CreatePost setPostId={this.props.setPostId} postId={this.props.postId} sessionToken={this.props.sessionToken} isOpen={this.props.isOpen} toggleModal={this.props.toggleModal} closeModal={this.props.closeModal} />

                </div>
                {/* <SideBar /> */}
            </div>
        )
    }
}

export default Home;