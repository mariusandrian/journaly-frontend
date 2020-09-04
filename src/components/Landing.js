import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

export class Landing extends Component {
    render() {
        return (
            <div className="container">
                <div className="landing-logo">Journaly</div>
                <div className="landing-nav">
                    <ul class="main-navigation-links">
                        <Link to="/login">
                            <li>Login</li>
                        </Link>
                        <Link to="/signup">
                            <li>Sign Up</li>
                        </Link>
                    </ul>
                </div>
                <div className="landing-main">
                    <div className="landing-text">
                        <h3>a simple diary for the busy person.</h3>
                    </div>
                    <div class="login-container">
                        <p class="sign" align="center">Log in</p>
                        <form class="form1">
                        <input class="un " type="text" align="center" placeholder="Username" />
                        <input class="pass" type="password" align="center" placeholder="Password" />
                        <Button variant="contained" color="primary">
                            Sign
                        </Button>
                        <p class="forgot" align="center"><a href="#">Forgot Password?</a></p>    
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing
