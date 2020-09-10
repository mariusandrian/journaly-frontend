import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import OtherEntries from '../components/OtherEntries';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Login from '../components/Login';
import Endpoints from '../config/endpoints';

const REACT_APP_SERVER_URL = Endpoints.REACT_APP_SERVER_URL;
const moment = require('moment');
const axios = require('axios');

class Home extends Component {
    constructor (props) {
        super(props)
        this.state = {
            success:"",
            error:"",
            content:""
        }
    }
    handleSubmit = async (e) => {
        try {
            const response = await axios({
                method: 'post',
                url: `${REACT_APP_SERVER_URL}/cty/post`,
                data: {
                    user_id: this.props.currentUser.user_id,
                    username: this.props.currentUser.username,
                    content: this.state.content,
                    question_id: this.props.dailyQuestion._id,
                    date: moment().format('LL')
                }
            });
            if(response.status) {
                this.setState({
                    success: "Post successfully sent"
                })
            };
        } catch (err) {
            console.log(err);
        }
    }
    handleChange = e => {
        const { name, value } = e.target;
    
        this.setState({
          [name]: value
        });
      };

    componentDidMount() {
        this.setState({
            success: "",
            error: ""
        })
    }
    render() {
        return (
            <React.Fragment>
                {this.props.isLogIn === false ?
                <Login 
                loginUsername= {this.props.loginUsername}
                loginPassword= {this.props.loginPassword}
                isLogIn= {this.props.isLogIn}
                error= {this.props.error}
                login={this.props.login}
                handleChange={this.props.handleChange}
                />
                :
                this.props.currentUser.hasWrittenToday === false ? 
                <React.Fragment>
                <div className="homepage-title">
                    <h2>Daily Journal</h2>
                    <h5>Reflect on today's journey</h5>
                    <Link to="/new">
                    <Button
                                variant="contained"
                                color="primary"
                    > Start Writing!
                    </Button>
                    </Link>
                </div>
                <div className="home-community-qn">
                        <h3>Today's Community Question</h3>
                        {/* Import from daily questions db */}
                        <h2>{this.props.dailyQuestion.content}</h2>
                        <TextareaAutosize 
                            rowsMin={3} 
                            className="input-textarea" 
                            name="content" 
                            value={this.state.content} 
                            aria-label="empty textarea" 
                            placeholder="Write a post..." 
                            id="content" 
                            maxLength="200"
                            onChange={this.handleChange} 
                        />
                        <br />
                        <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}
                            >
                                Send
                        </Button>
                        { this.state.success ? 
                        <Alert severity="success">{this.state.success}</Alert>
                        : ""}
                        { this.state.error ?
                        <Alert severity="warning">{this.state.error}</Alert>
                        : ""}
                        
                    </div>
                </React.Fragment>
                :
                <React.Fragment>
                    <div className="homepage-title">
                        <h2>Daily Feed</h2>
                        <h5>Here's what other people are writing</h5>
                        <OtherEntries currentUser={this.props.currentUser} />
                    </div>
                    <div className="home-community-qn">
                        <h3>Today's Community Question</h3>
                        {/* Import from daily questions db */}
                        <h2>{this.props.dailyQuestion.content}</h2>
                        <TextareaAutosize 
                            rowsMin={3} 
                            className="input-textarea" 
                            name="content" 
                            value={this.state.content} 
                            aria-label="empty textarea" 
                            placeholder="Write a post..." 
                            id="content" 
                            maxLength="200"
                            onChange={this.handleChange} 
                        />
                        <br />
                        <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}
                            >
                                Send
                        </Button>
                        { this.state.success ? 
                        <Alert severity="success">{this.state.success}</Alert>
                        : ""}
                        { this.state.error ?
                        <Alert severity="warning">{this.state.error}</Alert>
                        : ""}
                        
                    </div>
                </React.Fragment>
                } 
            </React.Fragment>

        )
    }
}

export default Home;