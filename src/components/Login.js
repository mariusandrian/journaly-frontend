import React, { Component } from 'react'
import { Form, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

export class Login extends Component {
    constructor (props) {
        super(props)
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
                                <Link to="/signup">
                                    <Button className="landing-header-button" id="signup-btn">Sign Up</Button>
                                </Link>
                        </div>
                    </div>
                    <div className="main-landing-container">
                        <div className="landing-text">
                            <h1>A simple diary for the ever-busy person.</h1>
                        </div>
                        <div className="login-container">
                            <Form className="login" onSubmit={this.props.login}>
                            <Form.Group as={Row}>
                                <Col sm="8">
                                    <Form.Control type="text" id="loginUsername" placeholder="username" value={this.props.loginUsername} onChange={this.props.handleChange} required />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col sm="8">
                                    <Form.Control type="password" id="loginPassword" placeholder="password" valuse={this.props.loginPassword} onChange={this.props.handleChange} required />
                                </Col>
                            </Form.Group>
                            {this.props.err ? 
                                <p>{this.props.err}</p>
                                : '' }
                            <Form.Group className="text-center">
                                <button className="login-button" type="submit" variant="primary">Log in</button>
                            </Form.Group>
                        </Form> 
                        </div>
                    </div>
                    
                </div>
            </React.Fragment>
        )
    }
}

export default Login

