import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { render } from '@testing-library/react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Props } from '../../App';
import { MDBBtn } from 'mdb-react-ui-kit';



export class CreateCom extends React.Component {







    render(): React.ReactNode {
        return (
            <div>
                <MDBBtn>Comment</MDBBtn>
            </div>
        )
    }
}

export default CreateCom