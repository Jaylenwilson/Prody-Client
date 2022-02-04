import { render } from '@testing-library/react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Props } from '../../App';

export interface CreateComProps {
    content: string
    userId: string
    postId: string
}

export class CreateCom extends React.Component {
    constructor(props: CreateComProps) {
        super(props)

        this.state = {
            content: '',
            userId: '',
            postId: ''
        }
    }


    render(): React.ReactNode {
        return (
            <div>

            </div>
        )
    }
}