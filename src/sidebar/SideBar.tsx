import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import Home from '../components/Home';
import { Routes, Route, Link } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { render } from '@testing-library/react';
import * as FaIcons from 'react-icons/fa';
import { Props } from '../App'

export interface SideBarProps {
    sessionToken: Props['sessionToken']
}


export interface SideBarState {
    toggleSidebar: boolean,
    route: string,
    isLoggedIn: boolean,
    sessionToken: Props['sessionToken']
}

export class Sidebar extends React.Component<SideBarProps, SideBarState> {
    constructor(props: SideBarProps) {
        super(props)

        this.state = {
            toggleSidebar: true,
            route: "",
            isLoggedIn: false,
            sessionToken: this.props.sessionToken
        }
    }



    displaySideBar = () => {
        if (this.props.sessionToken !== '') {
            this.setState({
                toggleSidebar: !this.state.toggleSidebar
            })
        }
    }

    componentDidMount() {
        this.displaySideBar()
    }

    componentDidUpdate(prevProps: Readonly<Props>) {
        if (prevProps.sessionToken !== this.state.sessionToken) {
            this.displaySideBar()
        }
    }

    componentWillUnmount() {
        this.setState({
            toggleSidebar: false
        })
    }






    render(): React.ReactNode {
        return (
            <div>
                {this.state.toggleSidebar ?
                    <div id="navbar" >
                        {/* {this.displaySideBar()} */}
                        <li>
                            <Link to="/home">Home <FaIcons.FaHome /> </Link>
                        </li>
                        <li>
                            <Link to="/mypost">My Post <FaIcons.FaBook /></Link>
                        </li>
                    </div> : null}
            </div>

        )
    }
}

export default Sidebar