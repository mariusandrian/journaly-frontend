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
                        <div className="landing-logo">Journaly</div>
                        <div className="landing-nav">
                            <ul className="main-navigation-links">
                                <Link to="/signup">
                                    <li>Sign Up</li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                        {/* <input placeholder="username" id="loginUsername" value={this.props.loginUsername} onChange={this.props.handleChange} />
                        <input placeholder="password" id="loginPassword" value={this.props.loginPassword} onChange={this.props.handleChange} /> */}
                        {/* <button onClick={this.props.login}>Submit</button> */}
                        
                    <Form className="login" onSubmit={this.props.login}>
                        <h2 className="text-center h2">LOG IN</h2>
                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                                Username
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" id="loginUsername" placeholder="username" value={this.props.loginUsername} onChange={this.props.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="4">
                                Password
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="password" id="loginPassword" placeholder="password" valuse={this.props.loginPassword} onChange={this.props.handleChange} required />
                            </Col>
                        </Form.Group>

                        <Form.Group className="text-center">
                            <Button type="submit" variant="primary">Log in</Button>
                        </Form.Group>
                    <p>{this.props.err}</p>
                    </Form> 
                </div>
            </React.Fragment>
        )
    }
}

export default Login

