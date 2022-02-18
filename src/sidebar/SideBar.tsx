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
    username: Props['username']
    clearToken: Props['clearToken']

}


export interface SideBarState {
    toggleSidebar: boolean,
    route: string,
    isLoggedIn: boolean
    sessionToken: Props['sessionToken']
}

export class Sidebar extends React.Component<SideBarProps, SideBarState> {
    constructor(props: SideBarProps) {
        super(props)

        this.state = {
            toggleSidebar: false,
            route: "",
            isLoggedIn: false,
            sessionToken: this.props.sessionToken,
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



    // componentWillRecieveProps(nextProps) {
    //     if (this.props.sessionToken ==! nextProps.sessionToken) {
    //         this.displaySideBar()
    //     }
    // }






    render(): React.ReactNode {
        return (
            <div id="navbardiv">
                {this.state.toggleSidebar ?
                    <div id="navbar" >
                        {/* {this.displaySideBar()} */}
                        <li>
                            <Link to="/home">Home <FaIcons.FaHome /> </Link>
                        </li>
                        <li>
                            <Link to="/mypost">My Post <FaIcons.FaBook /></Link>
                        </li>
                        <li>
                            <Link to="/mypost">{this.props.username}</Link>
                        </li>
                        <li>
                            <Link to="/" >Logout</Link>
                        </li>
                    </div> : null}
            </div>

        )
    }

}
export default Sidebar