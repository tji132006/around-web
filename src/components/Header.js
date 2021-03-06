import React from "react"
import logo from '../assets/images/logo.svg';
import {Icon} from "antd"

export class Header extends React.Component {
    handleClick = () => {
        this.props.handleLogout()
    }

    render(){
        return(
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Explore posts around you!</h1>
                {
                    this.props.isLoggedIn ?
                        <a href =""
                           className = "logout"
                           onClick = {this.props.logoutHandler}
                        >
                        <Icon type = "logout" />{' '}Logout
                    </a> : null}
            </header>
        );
    }
}