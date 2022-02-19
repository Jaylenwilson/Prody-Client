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
    ViewMyPosts: () => void
}



export class Delete extends React.Component<DeleteProps, {}>{
    constructor(props: DeleteProps) {
        super(props)


        this.handleClick = this.handleClick.bind(this)

    }


    handleClick(e: React.ChangeEvent<HTMLButtonElement>) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value

        })
    }

    deletePost = async (e: React.ChangeEvent<HTMLButtonElement>) => {

        console.log('USER', this.props.user)
        console.log('POSTID', this.props.postId)
        await fetch(`${APIURL}/posts/delete/${this.props.user}/${this.props.postId}`, {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("Authorization")}`
            })
        })
        this.props.ViewMyPosts()

    }




    render(): React.ReactNode {
        return (
            <>
                <MDBBtn className="btn btn-danger btn-floating" onClick={this.deletePost} value={this.props.postId} onChange={this.handleClick}>Delete</MDBBtn>
            </>
        )
    }


}

export default Delete