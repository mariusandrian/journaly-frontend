import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom";
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Icon from '@material-ui/core/Icon';

import axios from 'axios';
const BACKEND_URL = 'http://localhost:4000';

export class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "",
            data: "",
            mood: "",
            comment: ""
        }
    }
    getEntry = async () => {
        const response = await axios({
            method: 'get',
            url: `${BACKEND_URL}/entries/edit/${this.props.match.params.id}`,
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
    handleSubmit = async (e) => {
        try {
            const response = await axios({
                method: 'put',
                url: `${BACKEND_URL}/entries/reply/${this.state._id}`,
                data: {
                    user_id: this.props.currentUser.user_id,
                    username: this.props.currentUser.username,
                    content: this.state.comment,
                }
            });
            console.log(response);
            if(response.status) {
                this.props.history.push("/");
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
                            <p>{this.state.content}</p>
                        </div>
                        <div>
                            <h2>Your Reply</h2>
                            <TextareaAutosize name="comment" value={this.state.comment} aria-label="empty textarea" placeholder="Empty" id="content" onChange={this.handleChange} />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Comment