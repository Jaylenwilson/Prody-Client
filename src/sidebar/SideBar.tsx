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
    isLoggedIn: boolean
}

export class Sidebar extends React.Component<SideBarProps, SideBarState> {
    constructor(props: SideBarProps) {
        super(props)

        this.state = {
            toggleSidebar: false,
            route: "",
            isLoggedIn: false
        }
    }



    displaySideBar = () => {
        if (this.state.route !== '/') {
            this.setState({
                toggleSidebar: !this.state.toggleSidebar
            })
        }
    }



    render(): React.ReactNode {
        return (
            <div id="navbar">
                <li>
                    <Link to="/home">Home <FaIcons.FaHome /> </Link>
                </li>
                <li>
                    <Link to="/mypost">My Post <FaIcons.FaBook /></Link>
                </li>
            </div>
        )
    }
}

export default Sidebar