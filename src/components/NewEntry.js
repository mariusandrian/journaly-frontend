import React, { Component } from 'react'
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
const moment = require('moment');
const axios = require('axios');
const BACKEND_URL = 'http://localhost:4000';


export class NewEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mood: "",
            stage: 0,
            content: ""
        }
    }
    nextStage = () => {
        if(this.state.mood) {
            this.setState({
                error: "",
                stage: 1
            })
        } else {
            this.setState({
                error: "Please select one from above"
            })
        }
    }
    redirectToHome=(props)=> {
        this.props.history.push('/');
    }
    submitEntry = async(e) => {
        try {
            let response = '';
            let moodIndicator = 0;
            switch(this.state.mood) {
                case "elated":
                    moodIndicator = 5;
                    break;
                case "happy":
                    moodIndicator = 4;
                    break;
                case "ok":
                    moodIndicator = 3;
                    break;
                case "bad":
                    moodIndicator = 2;
                    break;
                case "awful":
                    moodIndicator = 1;
                    break;
            }
            if(this.state.content) {
                // send POST to server
                // console.log(this.props);
                response = await axios({
                    method: 'post',
                    url: `${BACKEND_URL}/entries`,
                    data: {
                        user_id: this.props.currentUser.user_id,
                        username: this.props.currentUser.username,
                        date: moment().format('LL'),
                        content: this.state.content,
                        mood: this.state.mood,
                        moodIndicator: moodIndicator
                    } 
                })
                .catch(function (error) {
                    console.log(error);
                });
                if(response.status) {
                    this.props.history.push('/');
                }
            } else {
                this.setState({
                    error: "Please enter a value above"
                });

            }
            // this.props.history.push('/');
        } catch(err) {
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
            stage: 0
        })
    }
    render() {
        return (
            <div className="new-entry-container">
                {this.state.stage === 0 ? 
                <React.Fragment>
                    <h2>How are you feeling today?</h2>
                    <div>
                        <form>
                        <fieldset id="group1">
                            <label htmlFor="elated">Elated</label>
                            <input 
                                type="radio" 
                                value="elated" 
                                name="mood" 
                                id="elated" 
                                onChange={this.handleChange}
                            />
                            <label htmlFor="happy">Happy</label>
                            <input 
                                type="radio" 
                                value="happy" 
                                name="mood" 
                                id="happy"
                                onChange={this.handleChange}
                            />
                            <label htmlFor="okay">Okay</label>
                            <input 
                                type="radio" 
                                value="okay" 
                                name="mood" 
                                id="okay"
                                onChange={this.handleChange}
                            />
                            <label htmlFor="bad">Bad</label>
                            <input 
                                type="radio" 
                                value="bad" 
                                name="mood" 
                                id="bad"
                                onChange={this.handleChange}
                            />
                            <label htmlFor="awful">Awful</label>
                            <input 
                                type="radio" 
                                value="awful" 
                                name="mood" 
                                id="awful"
                                onChange={this.handleChange}
                            />
                        </fieldset>
                        </form>
                        { this.state.error ? 
                            <Alert severity="warning">{this.state.error}</Alert>
                        : ""}
                        <button onClick={this.nextStage}>Next</button>
                    </div>
                </React.Fragment>
                :
                <React.Fragment>
                    <h2>What is it today that makes you feel {this.state.mood}?</h2>
                    <TextareaAutosize 
                        name="content"
                        onChange={this.handleChange}
                        rowsMin={3} 
                        className="input-textarea" 
                        placeholder="Write here..."
                        maxLength="200"
                    />
                    <br />
                    { this.state.error ? 
                        <Alert severity="warning">{this.state.error}</Alert>
                    : ""}
                    <button onClick={this.submitEntry}>Submit</button>
                </React.Fragment>
            }
            </div>
        )
    }
}

export default withRouter(NewEntry);