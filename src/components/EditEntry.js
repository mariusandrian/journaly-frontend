import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom";
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Endpoints from '../config/endpoints';
import axios from 'axios';

const REACT_APP_SERVER_URL = Endpoints.REACT_APP_SERVER_URL;

export class EditEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            data: "",
            mood: "",
        }
    }
    getEntry = async () => {
        const response = await axios({
            method: 'get',
            url: `${REACT_APP_SERVER_URL}/entries/edit/${this.props.match.params.id}`,
        })
        .catch(function (error) {
            console.log(error);
        });
        console.log(response);
        if(response.status) {
            this.setState({
                content: response.data.data.content,
                date: response.data.data.date,
                mood: response.data.data.mood,
                moodIndicator:  response.data.data.moodIndicator,
                _id: response.data.data._id
            })
        }
    }
    handleEdit = async (e) => {
        try {
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
            const response = await axios({
                method: 'put',
                url: `${REACT_APP_SERVER_URL}/entries/${this.state._id}`,
                data: {
                    content: this.state.content,
                    mood: this.state.mood,
                    moodIndicator: moodIndicator
                }
            });
            console.log(response);
            if(response.status) {
                this.props.history.push("/entries");
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
    componentDidMount () {
        this.getEntry();
        // console.log('islogin' + this.props.isLogin);
    }
    render() {
        return (
            <React.Fragment>
                <div className="likes-container">
                    <div className="likes-item">
                        <div className="likes-name">
                            <h3>{this.state.date}</h3>
                            <fieldset id="group1">
                            <label htmlFor="elated">Elated</label>
                            <input 
                                type="radio" 
                                checked={this.state.mood === "elated"}
                                value="elated"
                                name="mood" 
                                id="elated" 
                                onChange={this.handleChange}
                            />
                            <label htmlFor="happy">Happy</label>
                            <input 
                                type="radio" 
                                checked={this.state.mood === "happy"}
                                value="happy" 
                                name="mood" 
                                id="happy"
                                onChange={this.handleChange}
                            />
                            <label htmlFor="okay">Okay</label>
                            <input 
                                type="radio" 
                                checked={this.state.mood === "okay"}
                                value="okay" 
                                name="mood" 
                                id="okay"
                                onChange={this.handleChange}
                            />
                            <label htmlFor="bad">Bad</label>
                            <input 
                                type="radio" 
                                checked={this.state.mood === "bad"}
                                value="bad" 
                                name="mood" 
                                id="bad"
                                onChange={this.handleChange}
                            />
                            <label htmlFor="awful">Awful</label>
                            <input 
                                type="radio" 
                                checked={this.state.mood === "awful"}
                                value="awful" 
                                name="mood" 
                                id="awful"
                                onChange={this.handleChange}
                            />
                            </fieldset>
                            <TextareaAutosize name="content" value={this.state.content} aria-label="empty textarea" placeholder="Empty" id="content" onChange={this.handleChange} />
                        </div>
                        <div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                            onClick={this.handleEdit}
                        >
                            Save
                        </Button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default EditEntry
