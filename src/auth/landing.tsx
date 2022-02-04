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
}

export class Landing extends React.Component<{ sessionToken: Props['sessionToken'], updateToken: Props['updateToken'], setSessionToken: Props['setSessionToken'], toggleModal: Props['toggleModal'], isOpen: Props['isOpen'] }, LoginProps> {
    constructor(props: LandingProps) {
        super(props)


    }


    render(): React.ReactNode {
        return (
            <div>
                <Login sessionToken={this.props.sessionToken} updateToken={this.props.updateToken} setSessionToken={this.props.setSessionToken} toggleModal={this.props.toggleModal} isOpen={this.props.isOpen} />
            </div>
        )
    }
}



export default Landing