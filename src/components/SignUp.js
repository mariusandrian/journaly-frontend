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
                    <div className="landing-header">
                        <div className="landing-logo">
                            <h1>Journaly.</h1>
                        </div>
                        <div className="landing-nav">
                                <Link to="/">
                                    <Button className="landing-header-button" id="login-btn">Log In</Button>
                                </Link>
                        </div>
                    </div>
                    <div className="main-landing-container">
                    <div className="signup-container">
                        <Form className="login" onSubmit={this.signup}>
                        <h2 className="text-center h2">Sign Up to start writing</h2>
                        <Form.Group as={Row}>
                            <Col sm="8">
                                <Form.Control type="email" id="signupEmail" placeholder="Email" value={this.state.signupEmail} onChange={this.handleChange} required />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm="8">
                                <Form.Control type="text" id="signupUsername" placeholder="Username" value={this.state.signupUsername} onChange={this.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col sm="8">
                                <Form.Control type="password" id="signupPassword" placeholder="Password" value={this.state.signupPassword} onChange={this.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group className="text-center">
                        <button className="signup-button" type="submit" variant="primary">Sign Up</button>
                        </Form.Group>
                    <p>{this.props.err}</p>
                    </Form> 
                    </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default SignUp

