import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Form, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import Endpoints from '../config/endpoints';

const REACT_APP_SERVER_URL = Endpoints.REACT_APP_SERVER_URL;

export class SignUp extends Component {
    constructor (props) {
        super(props)
        this.state = {
            signupUsername: "",
            signupPassword: "",
            signupEmail: "",
            error: ""
        }
    }
    signup = (e) => {
        e.preventDefault();
        console.log('sending signup request');
        axios({
            method: "POST",
            data: {
                username: this.state.signupUsername,
                password: this.state.signupPassword,
                email: this.state.signupEmail
            },
            withCredentials: true,
            url: `${REACT_APP_SERVER_URL}/register`
        })
        
        .then( res => {
            this.props.history.push('/')
        }
        ).catch( error => {
            console.log(error.response.data.error);
            this.setState({
              error: error.response.data.error
            })
        });
    };
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value })
      }
    render() {
        return (
            <React.Fragment>
                <div>
                    <div>
                        <div className="landing-logo">Journaly</div>
                        <div className="landing-nav">
                            <ul className="main-navigation-links">
                                <Link to="/">
                                    <li>Log In</li>
                                </Link>
                            </ul>
                        </div>

                        <Form className="login" onSubmit={this.signup}>
                        <h2 className="text-center h2">SIGN UP</h2>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                                Email
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="email" id="signupEmail" placeholder="email" value={this.state.signupEmail} onChange={this.handleChange} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                                Username
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" id="signupUsername" placeholder="username" value={this.state.signupUsername} onChange={this.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                                Password
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="password" id="signupPassword" placeholder="password" value={this.state.signupPassword} onChange={this.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group className="text-center">
                            <Button type="submit" variant="primary">Sign Up</Button>
                        </Form.Group>
                    <p>{this.props.err}</p>
                    </Form> 
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SignUp

