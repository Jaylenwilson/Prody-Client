// DELETE POST FETCH GOES HERE
// CREATE BUTTON TO DELETE POST 
// DISPLAY IN VIEW POST 
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Props } from '../../App';
import { LoginProps } from '../../auth/login';
import { HomeProps } from '../Home';
import { MDBBtn } from 'mdb-react-ui-kit';
import APIURL from '../../helpers/environment';
export interface DeleteProps {
    user: LoginProps['user'],
    postId: HomeProps['postId']
}

export class Delete extends React.Component<{ user: LoginProps['user'], postId: HomeProps['postId'] }, DeleteProps>{
    constructor(props: DeleteProps) {
        super(props)

        this.state = {
            user: this.props.user,
            postId: this.props.postId,
        }
        this.handleClick = this.handleClick.bind(this)

    }


    handleClick(e: React.ChangeEvent<HTMLButtonElement>) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value

        })
    }

    deletePost = async (e: React.ChangeEvent<HTMLButtonElement>) => {

        console.log('USER', this.state.user)
        console.log('POSTID', this.state.postId)
        await fetch(`${APIURL}/posts/delete/${this.props.user}/${this.props.postId}`, {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("Authorization")}`
            })
        })

    }




    render(): React.ReactNode {
        return (
            <>
                <MDBBtn className="btn btn-danger btn-floating" onClick={this.deletePost} value={this.state.postId} onChange={this.handleClick}>Delete</MDBBtn>
            </>
        )
    }


}

export default Delete