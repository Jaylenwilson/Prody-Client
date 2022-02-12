import React from 'react';
import Login, { LoginProps } from './login';
import { Props } from '../App'

export interface LandingProps {
    sessionToken: Props['sessionToken'],
    updateToken: Props['updateToken'],
    setSessionToken: Props['setSessionToken'],
    toggleModal: Props['toggleModal'],
    isOpen: Props['isOpen'],
    message: string
    closeModal: Props['closeModal']
    setUser: Props['setUser']
    user: Props['user']
}

export class Landing extends React.Component<{ user: Props['user'], setUser: Props['setUser'], sessionToken: Props['sessionToken'], updateToken: Props['updateToken'], setSessionToken: Props['setSessionToken'], toggleModal: Props['toggleModal'], isOpen: Props['isOpen'], closeModal: Props['closeModal'], }, LoginProps> {
    constructor(props: LandingProps) {
        super(props)


    }


    render(): React.ReactNode {
        return (
            <div>
                <Login user={this.props.user} setUser={this.props.setUser} closeModal={this.props.closeModal} sessionToken={this.props.sessionToken} updateToken={this.props.updateToken} setSessionToken={this.props.setSessionToken} toggleModal={this.props.toggleModal} isOpen={this.props.isOpen} />
            </div>
        )
    }
}



export default Landing