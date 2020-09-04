import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import axios from 'axios';
const BACKEND_URL = 'http://localhost:4000';

export class Inbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mail: []
        }
    }
    getMail = async () => {
        // console.log(this.props.currentUser._id);
        const response = await axios({
            method: 'get',
            url: `${BACKEND_URL}/mail/${this.props.currentUser.user_id}`,
        })
        .catch(function (error) {
            console.log(error);
        });
        if(response.status) {
            this.setState({
                mail: response.data.data
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
    handleEdit(e) {
        const key = e.currentTarget.value;
        window.location.href = `/entries/edit/${key}`;
    }
    componentDidMount () {
        this.getMail();
        // console.log('islogin' + this.props.isLogin);
    }
    render() {
        return (
            <React.Fragment>
                <div className="likes-container">
                    {this.state.mail === 0 ? '' : 
                        this.state.mail.map((item, index) => {
                                    return(
                                        <div key={item._id} className="likes-item">
                                            <div className="likes-name">
                                                <h3>{item.username} replied to you</h3>
                                                <p>{item.date}</p>
                                                <p>{item.content}</p>
                                            </div>
                                            <div>
                                                <IconButton aria-label="delete" onClick={this.handleDelete} value={item._id}>
                                                    <DeleteIcon fontSize="small" />
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

export default Inbox