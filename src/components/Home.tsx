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
import * as FaIcons from 'react-icons/fa';

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
    username: Props['username'],
    posts: Props['posts']
    setPosts: Props['setPosts']
}

export interface HomeState {
    posts: string[],
    commentActive: boolean,
    content: string,
    commentId: string,
    postId: string,
    isOpen: boolean,
    viewcomment: boolean,
    commentEdit: boolean,
    commentMatch: boolean,
    isLoaded: boolean
    error: null
    results: string[]
    searchActive: boolean
    query: string
    searchParam: string[]
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
            viewcomment: false,
            commentEdit: false,
            commentMatch: false,
            isLoaded: false,
            error: null,
            results: [],
            searchActive: false,
            query: "",
            searchParam: ["category"]
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

                if (data.posts[0]) {
                    console.log(data.posts[0].id)
                    console.log(data)
                    // this.setState({ posts: data.posts, })
                    this.props.setPosts(data.posts)
                    this.setState({ results: data.posts })
                }
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

    deactivateComment = () => {
        this.setState({
            commentActive: false
        })
    }

    viewComment = (p: string) => {
        this.setState({
            viewcomment: !this.state.viewcomment
        })
    }

    activateCommentEdit = (p: string, c: string) => {
        this.setState({
            commentEdit: !this.state.commentEdit,
            postId: p,
            commentId: c
        })
        console.log(!this.state.commentEdit)
    }

    deactivateCommentEdit = () => {
        this.setState({
            commentEdit: false
        })
    }
    // activateDelete = (p: string, c: string) => {
    //     this.setState({
    //         postId: p,
    //         commentId: c
    //     })
    //     this.deleteComment()
    // }

    //1. get the array of posts 
    //2.make functionality to search through the array for categories & maybe descriptions
    //3. map that search results array 



    // add ternary for if comments show or not
    resultsMap = () => {
        return this.state.results?.map((results: any, index: number) => {
            console.log('MAP', results.id)
            console.log('COMMENTS', results.comments)
            return (
                <MDBCard className="card" key={results.id}>
                    {/* //  <h2>{this.props.username}</h2> */}
                    <MDBCardTitle className="title">{results.category}</MDBCardTitle>
                    <MDBCardBody>
                        <img src={results.image} alt="" />
                        <ReactPlayer className="video" url={results.link} />
                        <h3>{results.description}</h3>
                        <MDBBtn onClick={() => this.viewComment(results.id)}>view comments</MDBBtn>
                    </MDBCardBody>
                    {results.comments.map((c: any, index: number) => {
                        console.log(typeof c.content)
                        console.log(c.userId)
                        console.log(this.props.user)
                        return (
                            <div key={c.id}>
                                <div id="commentshell">
                                    {this.state.viewcomment ?
                                        //call delete and or edit function here
                                        <div className="commentcontent"  >
                                            {/* <h5>{this.props.username}</h5> */}
                                            <p id="content">{c.content}</p>
                                            {console.log(this.props.user, 'C User', c.userId)}
                                            {c.userId === this.props.user ?
                                                <div>
                                                    <MDBBtn onClick={() => this.activateCommentEdit(results.id, c.id)}> Edit</MDBBtn>
                                                    <MDBBtn onClick={() => this.deleteComment(results.id, c.id)}>Delete</MDBBtn>
                                                </div>
                                                : null

                                            }
                                            {/* {() => {
                                                console.log('UserId', c.userId)
                                                if (c.userId === this.props.user) {
                                                    return <MDBBtn onclick={this.activateCommentEdit}>Edit</MDBBtn>


                                                } else {
                                                    return null
                                                }
                                            }} */}


                                        </div>
                                        : null}
                                </div>
                            </div>
                        )
                    })}
                    <MDBBtn onClick={() => this.activateComment(results.id)} postId={results.id}>Comment</MDBBtn>
                </MDBCard>
            )
        })
    }


    postMap = () => {
        return this.props.posts?.map((posts: any, index: number) => {
            // console.log('MAP', posts.id)
            // console.log('COMMENTS', posts.comments)
            return (
                <MDBCard className="card" key={posts.id}>
                    {/* //  <h2>{this.props.username}</h2> */}
                    <MDBCardTitle className="title">{posts.category}</MDBCardTitle>
                    <MDBCardBody>
                        <img src={posts.image} alt="" />
                        <ReactPlayer className="video" url={posts.link} />
                        <h3>{posts.description}</h3>
                        <MDBBtn onClick={() => this.viewComment(posts.id)}>view comments</MDBBtn>
                    </MDBCardBody>
                    {posts.comments.map((c: any, index: number) => {
                        // console.log(typeof c.content)
                        // console.log(c.userId)
                        // console.log(this.props.user)
                        return (
                            <div key={c.id}>
                                <div id="commentshell">
                                    {this.state.viewcomment ?
                                        //call delete and or edit function here
                                        <div className="commentcontent"  >
                                            {/* <h5>{this.props.username}</h5> */}
                                            <p id="content">{c.content}</p>
                                            {/* {console.log(this.props.user, 'C User', c.userId)} */}
                                            {c.userId === this.props.user ?
                                                <div>
                                                    <MDBBtn onClick={() => this.activateCommentEdit(posts.id, c.id)}> Edit</MDBBtn>
                                                    <MDBBtn onClick={() => this.deleteComment(posts.id, c.id)}>Delete</MDBBtn>
                                                </div>
                                                : null

                                            }
                                            {/* {() => {
                                                console.log('UserId', c.userId)
                                                if (c.userId === this.props.user) {
                                                    return <MDBBtn onclick={this.activateCommentEdit}>Edit</MDBBtn>


                                                } else {
                                                    return null
                                                }
                                            }} */}


                                        </div>
                                        : null}
                                </div>
                            </div>
                        )
                    })}
                    <MDBBtn onClick={() => this.activateComment(posts.id)} postId={posts.id}>Comment</MDBBtn>
                </MDBCard>

            )
        })
    }


    deleteComment = async (pid: string, cid: string) => {

        try {
            const res = await fetch(`${APIURL}/comments/delete/${this.props.user}/${pid}/${cid}`, {
                method: 'DELETE',
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem("Authorization")}`
                })
            })
            const json = await res.json()
            this.ViewPost()
            console.log(json)
        } catch (err) {
            console.log(err)
        }

    }

    createComment = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(this.state)
        console.log(e)
        await fetch(`${APIURL}/comments/comment`, {
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
                    // postId: this.state.postId
                    commentActive: false

                })
                this.ViewPost()
            })
    }

    editComment = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetch(`${APIURL}/comments/edit/${this.props.user}/${this.state.postId}/${this.state.commentId}`, {
            method: 'PUT',
            body: JSON.stringify({
                comments: {
                    content: this.state.content
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("Authorization")}`
            })
        })
        this.setState({
            commentEdit: false
        })
        this.ViewPost()
    }

    searchPost = (e: React.ChangeEvent<HTMLFormElement>) => {
        // this.resultsMap()
        e.preventDefault()
        this.setState({ searchActive: true })
        this.setState({
            results: this.state.results.filter((results: string) => {
                return this.state.searchParam.some((newResults: any) => {
                    return (results[newResults].toString().toLowerCase().indexOf(this.state.query.toLowerCase()) > -1
                    )
                });
            }),
        })

    };


    render(): React.ReactNode {
        console.log(this.props)
        console.log(this.state)
        return (

            <div id="viewwrapper">


                <form onSubmit={this.searchPost}>
                    <input type="search" id="searchform" name="query" placeholder="Search for ..." value={this.state.query} onChange={this.handleClick} />
                    <button type="submit"> <FaIcons.FaSearch className="searchbtn" color="#042121" /> </button>
                </form>

                <Container id="homecontainer">
                    <Row>
                        <div >
                            <MDBBtn id="createbtn" onClick={this.props.toggleModal}><FaIcons.FaPlus className="fa-2xl" /></MDBBtn>
                            {/* <Button onClick={this.props.toggleModal}>gggg</Button> */}
                            <CreatePost ViewPost={this.ViewPost} setPostId={this.props.setPostId} postId={this.props.postId} sessionToken={this.props.sessionToken} isOpen={this.props.isOpen} toggleModal={this.props.toggleModal} closeModal={this.props.closeModal} />

                        </div>
                        <Col>
                            {/* returns the results map if search is active else returns postmap */}
                            {this.state.searchActive ? this.resultsMap() : this.postMap()}
                            {/* {this.state.searchActive ? this.postMap() : <p>hello world</p>} */}

                        </Col>
                    </Row>
                    {this.state.commentActive ?

                        <Modal isOpen={this.state.commentActive}>
                            <div id="createmodal">
                                <ModalHeader className="closemodal">Comment</ModalHeader>
                            </div>
                            <ModalBody>
                                <Form onSubmit={this.createComment}>
                                    <FormGroup>
                                        <Label>Create a Comment</Label>
                                        <Input id="comment" type="textarea" name="content" value={this.state.content} onChange={this.handleClick} label="comment" />
                                    </FormGroup>
                                    <Button type="submit">Create</Button>
                                    <Button className="closebtn" onClick={this.deactivateComment}><FaIcons.FaTimes /></Button>

                                </Form>
                            </ModalBody>


                        </Modal> : null}


                </Container>
                <div>
                    {this.state.commentEdit ?
                        <Modal isOpen={this.state.commentEdit}>
                            <div id="createmodal">
                                <ModalHeader className="closemodal">Edit Comment</ModalHeader>
                            </div>
                            <ModalBody>
                                <Form onSubmit={this.editComment}>
                                    <FormGroup>
                                        <Label>Edit</Label>
                                        <Input id="comment" type="textarea" name="content" value={this.state.content} onChange={this.handleClick} label="comment" />
                                    </FormGroup>
                                    <Button type="submit">Create</Button>
                                    <Button className="closebtn" onClick={this.deactivateCommentEdit}><FaIcons.FaTimes /></Button>

                                </Form>
                            </ModalBody>


                        </Modal> : null}
                </div>

                {/* <SideBar /> */}
            </div>
        )
    }
}

export default Home;