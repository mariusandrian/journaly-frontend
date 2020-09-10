import React, { Component } from 'react'
import { Redirect, Link } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ChatIcon from '@material-ui/icons/Chat';
import moment from 'moment';
import RepliesList from './RepliesList';
import axios from 'axios';
import _ from 'lodash'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import Endpoints from '../config/endpoints';

const REACT_APP_SERVER_URL = Endpoints.REACT_APP_SERVER_URL;

export class Community extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [
                {
                    user_id: "",
                    username: "",
                    content: "",
                    replies: [{
                        username: "",
                        content: "",
                    }]
                }
            ],
            showEmojiMart: false
        }
    }
    getCommunityPosts = async () => {
        console.log('daily question is ', this.props.dailyQuestion)
        await this.props.getDailyQuestion();
        const response = await axios({
            method: 'get',
            url: `${REACT_APP_SERVER_URL}/cty/feed/${this.props.dailyQuestion._id}`,
        })
        .catch(function (error) {
            console.log(error);
        });
        if(response.status) {
            this.setState({
                posts: response.data.data
            })
        }
    }
    handleChange = e => {
        const { name, value } = e.target;
    
        this.setState({
          [name]: value
        });
      };
    handleSubmit = async(e) => {
        e.preventDefault();
        console.log(e.currentTarget);
        let postId = e.currentTarget.id;

        const response = await axios({
            method: 'post',
            url: `${REACT_APP_SERVER_URL}/cty/reply/${postId}`,
            data: {
                user_id: this.props.currentUser.user_id,
                username: this.props.currentUser.username,
                date: moment().format('LL'),
                content: this.state[postId],
            } 
        })
        .catch(function (error) {
            console.log(error);
        });
        if(response.status) {
            this.setState({
                [postId]: ""
            })
            this.getCommunityPosts();
        }
    }
    // handleDelete = async (e) => {
    //     try {
    //         const entryKey = e.currentTarget.value;
    //         const response = await axios({
    //             method: 'delete',
    //             url: `${BACKEND_URL}/entries/${entryKey}`,
    //         });
    //         if(response.status) {
    //             this.getEntries();
    //         };
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    // handleEdit(e) {
    //     const key = e.currentTarget.value;
    //     window.location.href = `/entries/edit/${key}`;
    // }

    handleAdd = (event) => {
        console.log(event.currentTarget.id);
        const selectedPostIndex = event.currentTarget.id;
        this.setState(prevState => ({
            posts: prevState.posts.map((obj, index) => {
                // console.log(obj);
                if (selectedPostIndex === index) {
                    Object.assign(obj, { description: "New Description" })
                    console.log(obj)
            }
        })
    }));
    }

    handleSelect = (event, emoji) => {
    const currentUser = localStorage.getItem("currentUser");
    const currentUsername = currentUser.username;
    console.log(event.target);
    // const index = _.findIndex(this.state.counters, { emoji, by: currentUsername})
    // if (index > -1) {
    //   this.setState({
    //     counters: [...this.state.counters.slice(0, index), ...this.state.counters.slice(index + 1)],
    //     showSelector: false,
    //   })
    // } else {
    //   this.setState({
    //     counters: [...this.state.counters, { emoji, by: this.state.user }],
    //     showSelector: false,
    //   })
    // }
  }
    componentDidMount () {
        this.getCommunityPosts();
        // console.log('islogin' + this.props.isLogin);
    }
    componentDidUpdate () {

    }
    render() {
        return (
            <React.Fragment>
                <div className="home-community-qn">
                        <h3>Today's Community Question</h3>
                        <h2>{this.props.dailyQuestion.content}</h2>
                </div>
                <div className="likes-container">
                    {this.state.posts === 0 ? '' : 
                        this.state.posts.map((item, index) => {
                                    return(
                                        <div key={item._id} className="likes-item">
                                            <div className="likes-name">
                                                <h3>{item.username}</h3>
                                                <p>{item.content}</p>
                                                <div style={{position:"relative"}}>
                                                {/* {this.state.posts[index].showEmojiMart ? 
                                                <Picker 
                                                set='apple' 
                                                style={{ position: 'absolute', bottom: '20px'}}
                                                />
                                                : ''} */}
                                                {/* <button id={index} onClick={this.handleAdd}>Like</button> */}
                                                </div>
                                                <form onSubmit={this.handleSubmit} id={item._id}>
                                                    <input onChange={this.handleChange} name={item._id} value={this.state[item._id]} type="text" placeholder="Write a comment..." required/>
                                                </form>
                                                <div className="replies-container">
                                                <RepliesList 
                                                    item={item}
                                                />
                                                </div>
                                                {/* {item.replies ? '' :
                                                    item.replies.map((item, index) => {
                                                        return(
                                                            <div className="comment-item">
                                                                <h4>{item.username}</h4>
                                                                <p>{item.content}</p>
                                                            </div>
                                                        )
                                                    })
                                                } */}
                                            </div>
                                        </div>
                                        )
                                })
                        }
                </div>
            </React.Fragment>
        )
    }
}

export default Community