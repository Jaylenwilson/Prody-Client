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


export interface MyPostProps {
    postId: Props['postId'],
    user: Props['user'],
    setUser: Props['setUser']
}

export interface MyPostState {
    category: string,
    description: string,
    image: string,
    link: string,
    myPosts: string[],
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
        }
        this.ViewMyPosts = this.ViewMyPosts.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }


    editPost = async (e: React.ChangeEvent<HTMLFormElement>) => {
        await fetch(`http://${APIURL}/posts/${this.props.user}/${this.props.postId}`, {
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


    }

    componentDidMount() {
        this.ViewMyPosts()
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

                console.log(this.state.myPosts)
            })
            .catch((err) => console.log(err))
    }

    myPostMap = () => {
        return this.state.myPosts?.map((myPosts: any, index: number) => {
            return (
                <MDBCard className="card" key={myPosts.id}  >
                    <MDBCardTitle className="title">{myPosts.category}</MDBCardTitle>
                    <MDBCardBody>
                        <ReactPlayer className="video" url={myPosts.link} />
                        <MDBCardText>{myPosts.description}</MDBCardText>
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
            </div>
        )
    }

}




export default MyPost