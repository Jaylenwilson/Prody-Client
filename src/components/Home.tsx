import React from 'react';
import CreatePost from './Create-View/CreatePost';
import App from '../App';
import { Props } from '../App';
import { MDBBtn } from 'mdb-react-ui-kit';

export interface HomeProps {
    sessionToken: Props['sessionToken'],
    isOpen: Props['isOpen'],
    toggleModal: Props['toggleModal'],
    closeModal: Props['closeModal']
}

export class Home extends React.Component<{ sessionToken: Props['sessionToken'], isOpen: Props['isOpen'], toggleModal: Props['toggleModal'], closeModal: Props['closeModal'] }> {
    constructor(props: Props) {
        super(props)
    }
    render(): React.ReactNode {
        return (
            <div >
                <MDBBtn onClick={this.props.toggleModal}>Create</MDBBtn>
                <CreatePost sessionToken={this.props.sessionToken} isOpen={this.props.isOpen} toggleModal={this.props.toggleModal} closeModal={this.props.closeModal} />
            </div>
        )
    }
}

export default Home;