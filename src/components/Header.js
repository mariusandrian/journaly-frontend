import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Header extends Component {
    render() {
        return (
            <nav className="main-navigation">
                <ul className="main-navigation-links">
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/entries">
                        <li>Entries</li>
                    </Link>
                    <Link to="/community">
                        <li>Community</li>
                    </Link>
                    <Link to="/inbox">
                        <li>Inbox</li>
                    </Link>
                    {!this.props.isLogIn ?
                        <React.Fragment>
                            <Link to="/login">
                                <li>LOG IN</li>
                            </Link>
                            <Link to="/signup">
                                <li>SIGN UP</li>
                            </Link>
                        </React.Fragment>
                        : <React.Fragment>
                            <Link to="/profile">
                                <li>
                                    <img className="avatar" src={this.props.avatar} alt="profile-img"></img>{this.props.username}
                                </li>
                            </Link>
                            <Link to="/">
                                <li onClick={this.props.logout}>SIGN OUT</li>
                            </Link>
                        </React.Fragment>

                    }
                </ul>
            </nav>
        )
    }
}

export default Header
