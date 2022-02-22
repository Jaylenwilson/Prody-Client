import React from 'react';
import { Props } from '../App';
import APIURL from '../helpers/environment';
import { Container, Row, Col, Card, CardBody, CardText, CardTitle, } from 'reactstrap';

export interface AdminProps {
    role: Props['role']
}

export interface AdminState {
    adminData: string[]
}



export class Admin extends React.Component<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props)

        this.state = {
            adminData: []
        }

    }


    AdminView = async () => {

        await fetch(`${APIURL}/auth/userinfo`, {
            method: 'GET',
            headers: new Headers({
                "content-Type": "application/json",
                Authorization: `${localStorage.getItem("Authorization")}`
            })
        })
            .then(data => data.json())
            .then(data => {
                console.log(data)
                this.setState({
                    adminData: data.userinfo
                })
            })
            .catch((err) => console.log(err))

    }

    adminMap = () => {
        return this.state.adminData?.map((user: any, index: number) => {
            return (
                <tbody key={user.id}>
                    <tr>
                        <td>{user.username}</td>
                        {/* <td>{user.posts[0]}</td>
                        <td>{user.posts.comments[0]}</td> */}
                        <td>
                            {user.posts[0] ?
                                <select name="" id="">{user.posts.map((post: any, index: number) => (
                                    <option value={post.id}> {post.description}</option>
                                ))}</select> : "no post"}
                        </td>
                        {/* <td>
                            {user.posts[0] ?
                                <select name="" id="">{user.posts.map((post: any, index: number) => (
                                    <option value={post.id}> {post.description}</option>
                                ))}</select> : null}
                        </td> */}
                    </tr>
                </tbody>
            )
        })
    }

    componentDidMount() {
        if (localStorage.getItem("role") === "Admin") {
            this.AdminView()
        }
    }

    render(): React.ReactNode {
        return (
            <div >
                <div  >
                    <Container id="table">
                        <table >
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Posts</th>
                                </tr>
                            </thead>
                            {this.adminMap()}
                        </table>
                    </Container>
                </div>
            </div>
        )
    }

}

export default Admin;