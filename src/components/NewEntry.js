import React, { Component } from 'react'
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Endpoints from '../config/endpoints';

const REACT_APP_SERVER_URL = Endpoints.REACT_APP_SERVER_URL;

const moment = require('moment');
const axios = require('axios');

export class NewEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // mood: "",
            stage: 0,
            // content: ""
        }
    }
    nextStage = () => {
        if(this.props.newEntryMood) {
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
    // submitNewEntry = async(e) => {
    //     try {
    //         let response = '';
    //         let moodIndicator = 0;
    //         switch(this.state.mood) {
    //             case "elated":
    //                 moodIndicator = 5;
    //                 break;
    //             case "happy":
    //                 moodIndicator = 4;
    //                 break;
    //             case "ok":
    //                 moodIndicator = 3;
    //                 break;
    //             case "bad":
    //                 moodIndicator = 2;
    //                 break;
    //             case "awful":
    //                 moodIndicator = 1;
    //                 break;
    //         }
    //         if(this.state.content) {
    //             // send POST to server
    //             // console.log(this.props);
    //             response = await axios({
    //                 method: 'post',
    //                 url: `${BACKEND_URL}/entries`,
    //                 data: {
    //                     user_id: this.props.currentUser.user_id,
    //                     username: this.props.currentUser.username,
    //                     date: moment().format('LL'),
    //                     content: this.state.content,
    //                     mood: this.state.mood,
    //                     moodIndicator: moodIndicator
    //                 } 
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //             if(response.status) {
    //                 this.props.history.push('/');
    //             }
    //         } else {
    //             this.setState({
    //                 error: "Please enter a value above"
    //             });

    //         }
    //     } catch(err) {
    //         console.log(err);
    //     }
    // }
    // handleChange = e => {
    //     const { name, value } = e.target;
    
    //     this.setState({
    //       [name]: value
    //     });
    //   };
    handleSubmit = () => {
        this.props.submitNewEntry();
        this.props.history.push('/');
    }
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
                                name="newEntryMood" 
                                id="elated" 
                                onChange={this.props.handleNewEntryChange}
                            />
                            <label htmlFor="happy">Happy</label>
                            <input 
                                type="radio" 
                                value="happy" 
                                name="newEntryMood" 
                                id="happy"
                                onChange={this.props.handleNewEntryChange}
                            />
                            <label htmlFor="okay">Okay</label>
                            <input 
                                type="radio" 
                                value="okay" 
                                name="newEntryMood" 
                                id="okay"
                                onChange={this.props.handleNewEntryChange}
                            />
                            <label htmlFor="bad">Bad</label>
                            <input 
                                type="radio" 
                                value="bad" 
                                name="newEntryMood" 
                                id="bad"
                                onChange={this.props.handleNewEntryChange}
                            />
                            <label htmlFor="awful">Awful</label>
                            <input 
                                type="radio" 
                                value="awful" 
                                name="newEntryMood" 
                                id="awful"
                                onChange={this.props.handleNewEntryChange}
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
                    <h2>What is it today that makes you feel {this.props.newEntryMood}?</h2>
                    <TextareaAutosize 
                        name="newEntryContent"
                        onChange={this.props.handleNewEntryChange}
                        rowsMin={3} 
                        className="input-textarea" 
                        placeholder="Write here..."
                        maxLength="200"
                    />
                    <br />
                    { this.props.newEntryError ? 
                        <Alert severity="warning">{this.props.newEntryError}</Alert>
                    : ""}
                    <button onClick={this.handleSubmit}>Submit</button>
                </React.Fragment>
            }
            </div>
        )
    }
}

export default withRouter(NewEntry);