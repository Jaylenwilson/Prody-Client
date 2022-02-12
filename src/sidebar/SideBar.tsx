import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import Home from '../components/Home';
import { Routes, Route, Link } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import { render } from '@testing-library/react';

export interface SideBarProps {
    toggleSidebar: boolean,
    route: string,
    isLoggedIn: boolean
}

export class Sidebar extends React.Component<{}, SideBarProps> {
    constructor(props: SideBarProps) {
        super(props)

        this.state = {
            toggleSidebar: false,
            route: "",
            isLoggedIn: false
        }
    }

    styles = {
        bmBurgerButton: {
            position: 'fixed',
            width: '36px',
            height: '30px',
            left: '36px',
            top: '36px'
        },
        bmBurgerBars: {
            background: '#373a47'
        },
        bmBurgerBarsHover: {
            background: '#a90000'
        },
        bmCrossButton: {
            height: '24px',
            width: '24px'
        },
        bmCross: {
            background: '#bdc3c7'
        },
        bmMenuWrap: {
            position: 'fixed',
            height: '100%'
        },
        bmMenu: {
            background: '#373a47',
            padding: '2.5em 1.5em 0',
            fontSize: '1.15em'
        },
        bmMorphShape: {
            fill: '#373a47'
        },
        bmItemList: {
            color: '#b8b7ad',
            padding: '0.8em'
        },
        bmItem: {
            display: 'inline-block'
        },
        bmOverlay: {
            background: 'rgba(0, 0, 0, 0.3)'
        },
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
            <Menu styles={this.styles} isOpen={true}>
                <div>
                    <NavItem>
                        <Link className="link" to="/home"  >Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link className="link" to="/myposts">My Posts</Link>
                    </NavItem>
                </div>
            </Menu>
        )
    }
}

export default Sidebar