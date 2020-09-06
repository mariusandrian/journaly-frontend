import React, { Component } from 'react'

export class Login extends Component {
    constructor (props) {
        super(props)
    }
    
    render() {
        return (
            <div>
                <div className="container">
                    <div>
                        <h1>Login</h1>
                        <input placeholder="username" id="loginUsername" value={this.props.loginUsername} onChange={this.props.handleChange} />
                        <input placeholder="password" id="loginPassword" value={this.props.loginPassword} onChange={this.props.handleChange} />
                        <button onClick={this.props.login}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login

