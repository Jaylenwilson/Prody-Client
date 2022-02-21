import React from 'react';
import { Props } from '../App';
import APIURL from '../helpers/environment';

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
                // Authorization: `${localStorage.getItem("Authorization")}`
            })
        })
            .then(data => data.json())
            .then(data => {
                console.log(data)
            })
            .catch((err) => console.log(err))

    }

    componentDidMount() {
        this.AdminView()
    }

    render(): React.ReactNode {
        return (
            <h1>hello world</h1>
        )
    }

}

export default Admin;