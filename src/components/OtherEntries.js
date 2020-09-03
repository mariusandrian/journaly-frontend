import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';

import axios from 'axios';
const BACKEND_URL = 'http://localhost:4000';

export class OtherEntries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: []
        }
    }
    getOtherEntries = async () => {
        // console.log(this.props.currentUser._id);
        const response = await axios({
            method: 'get',
            url: `${BACKEND_URL}/top/${this.props.currentUser.user_id}`,
        })
        .catch(function (error) {
            console.log(error);
        });
        if(response.status) {
            this.setState({
                entries: response.data.data
            })
        }
    }
    handleDelete = async (e) => {
        try {
            const entryKey = e.currentTarget.value;
            const response = await axios({
                method: 'delete',
                url: `${BACKEND_URL}/entries/${entryKey}`,
            });
            if(response.status) {
                this.getEntries();
            };
        } catch (err) {
            console.log(err);
        }
    }
    handleComment(e) {
        const key = e.currentTarget.value;
        window.location.href = `/entries/comment/${key}`;
    }
    componentDidMount () {
        this.getOtherEntries();
        // console.log('islogin' + this.props.isLogin);
    }
    render() {
        return (
            <React.Fragment>
                <div className="likes-container">
                    {this.state.entries === 0 ? '' : 
                        this.state.entries.map((item, index) => {
                                    return(
                                        <div key={item._id} className="likes-item">
                                            <div className="likes-name">
                                                <h3>{item.date}</h3>
                                                <p>{item.content}</p>
                                                <IconButton aria-label="comment" onClick={this.handleComment} value={item._id}>
                                                    <ChatIcon fontSize="small" />
                                                </IconButton>
                                            </div>
                                        </div>
                                        )
                                }
                            )
                        }
                </div>
            </React.Fragment>
        )
    }
}

export default OtherEntries