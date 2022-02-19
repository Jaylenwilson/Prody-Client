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
    route: string,
    isLoggedIn: boolean
}

export class Sidebar extends React.Component<SideBarProps, SideBarState> {
    constructor(props: SideBarProps) {
        super(props)

        this.state = {
            route: "",
            isLoggedIn: false,
        }
    }








    // componentWillRecieveProps(nextProps) {
    //     if (this.props.sessionToken ==! nextProps.sessionToken) {
    //         this.displaySideBar()
    //     }
    // }






    render(): React.ReactNode {
        return (
            <div id="navbardiv">
                {this.props.sessionToken ?
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
                            <Link to="/"  > <button onClick={this.props.clearToken}>Logout</button></Link>
                        </li>
                    </div> : null}
            </div>

        )
    }

}
export default Sidebar