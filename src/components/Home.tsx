import React from 'react';
import CreatePost from './Create-View/CreatePost';
import App from '../App';
import { Props } from '../App';
import { MDBBtn } from 'mdb-react-ui-kit';
import { CreatePostProps } from './Create-View/CreatePost';
import { Container, Row, Col, } from 'reactstrap';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardImage, MDBCardText } from 'mdb-react-ui-kit';
import ReactPlayer from 'react-player'

// Render a YouTube video player
<ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
// import ViewPost from './Create-View/ViewPost';
// import ViewP, { ViewAllProps } from './Create-View/ViewPost'

export interface HomeProps {
    sessionToken: Props['sessionToken'],
    isOpen: Props['isOpen'],
    toggleModal: Props['toggleModal'],
    closeModal: Props['closeModal'],
    // category: CreatePostProps['category'],
    // description: CreatePostProps['description'],
    // image: CreatePostProps['image'],
    // link: CreatePostProps['link'],
    posts: string[],

    // posts: ViewAllProps['posts']
}

export class Home extends React.Component<{
    sessionToken: Props['sessionToken'],
    isOpen: Props['isOpen'],
    toggleModal: Props['toggleModal'],
    closeModal: Props['closeModal'],
    // category: CreatePostProps['category'],
    // description: CreatePostProps['description'],
    // image: CreatePostProps['image'],
    // link: CreatePostProps['link'],

}, HomeProps> {
    constructor(props: HomeProps) {
        super(props)

        this.state = {
            sessionToken: this.props.sessionToken,
            isOpen: this.props.isOpen,
            toggleModal: this.props.toggleModal,
            closeModal: this.props.closeModal,
            posts: [],


            // category: this.props.category,
            // description: this.props.description,
            // image: this.props.image,
            // link: this.props.link
        }
    }

    componentDidMount() {
        this.ViewPost()
    }

    ViewPost = async () => {
        await fetch(`http://localhost:5000/posts/postinfo`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("Authorization")}`
            })
        })
            .then(data => data.json())
            .then(data => {
                console.log(data)
                this.setState({
                    posts: data.posts,

                })
            })
            .catch((err) => console.log(err))

    }

    postMap = () => {
        return this.state.posts?.map((posts: any, index: number) => {
            return (
                <MDBCard key={index}>
                    <MDBCardTitle>{posts.category}</MDBCardTitle>
                    <MDBCardBody>
                        <ReactPlayer url={posts.link} />
                        <MDBCardText>{posts.description}</MDBCardText>
                    </MDBCardBody>
                </MDBCard>

            )
        })
    }



    render(): React.ReactNode {
        return (
            <div id="viewwrapper">
                <Container>
                    <Row>
                        <Col>
                            {this.postMap()}
                        </Col>
                    </Row>
                </Container>
                <div >
                    <MDBBtn onClick={this.props.toggleModal}>Create</MDBBtn>
                    <CreatePost sessionToken={this.props.sessionToken} isOpen={this.props.isOpen} toggleModal={this.props.toggleModal} closeModal={this.props.closeModal} />
                    {/* <ViewP /> */}
                </div>
            </div>
        )
    }
}

export default Home;