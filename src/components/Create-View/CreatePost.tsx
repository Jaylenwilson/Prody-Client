// CREATE POST FETCH GOES HERE
// SENT T APP.TSX
// CREATE BUTTON TO BE DISPLAYED IN APP.TSX
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Props } from '../../App';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

export interface CreatePostProps {
    category: string,
    description: string,
    image: string
}

export class CreateP extends React.Component {
    constructor(props: CreatePostProps) {
        super(props)

        this.state = {
            category: '',
            descriptio: '',
            image: '',
        }
    }














    render(): React.ReactNode {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label> Category</Label>
                        <Input type='text' name='category' />
                    </FormGroup>
                    <FormGroup>
                        <Label> description</Label>
                        <Input type='textarea' name='description' />
                    </FormGroup>
                    <FormGroup>
                        <Label> Image</Label>
                        <Input type='file' name='catgory' />
                    </FormGroup>
                    <Button type='submit'>Create Post</Button>
                </Form>
            </div>
        )
    }
}

export default CreateP