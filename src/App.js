import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import sessionService from './services/sessionService';
import usersService from './services/usersService';

import { ParallaxProvider } from 'react-scroll-parallax';
import NewEntry from './components/NewEntry';
import Entries from './components/Entries';
import EditEntry from './components/EditEntry';
import Comment from './components/Comment';
import Community from './components/Community';
import Inbox from './components/Inbox';
import Login from './components/Login';
import SignUp from './components/SignUp';

import moment from 'moment';
import axios from 'axios';
import ProtectedRoute from './components/ProtectedRoute';

const BACKEND_URL = 'http://localhost:4000';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000'
// const buildUrl = apiPath => {
//     return BACKEND_URL + apiPath;
// };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        username: "initialtest",
        user_id: "5f4a24df74480ab8123919a3",
        avatar: "https://www.kayawell.com/Data/UserContentImg/2018/3/b1b977c9-671f-47af-8956-d4037e5a82fd.jpg",
        hasWrittenToday: false
      },
      loginUsername: "",
      loginPassword: "",
      isLogin: "",
      error: "",
      isLogIn: false,
      err: '',
      currentEntry: "",
      dailyQuestion: {},
      newEntryContent: "",
      newEntryMood: "",
      newEntryError: ""
    }
  }


  // Check User Authentication
  checkAuthentication = async () => {
    const result = await sessionService.checkAuthentication();
    console.log('result is of auth check is ', result);
    if (result.isLogin) {
      console.log('into if statement')
      const currentUser = localStorage.getItem('currentUser');
      console.log(currentUser)
      const parsedUser = JSON.parse(currentUser);
      console.log(parsedUser)
      const stateUser = {
        username: parsedUser.username,
        user_id: parsedUser._id
      }
      console.log(stateUser);
      this.setState({
        isLogIn: true,
        currentUser: {
          ...this.state.currentUser,
          user_id: parsedUser._id,
          username: parsedUser.username
        }
      })
    }
  }
  login = () => {
    console.log('sending login request');
    axios({
        method: "POST",
        data: {
            username: this.state.loginUsername,
            password: this.state.loginPassword
        },
        withCredentials: true,
        url: "http://localhost:4000/login"
    })
    
    .then( res => {
        console.log(res)
            const currentUser = {
                _id: res.data.data._id,
                username: res.data.data.username
            }
            const id = res.data.data._id;
            const username= res.data.data.username;
            console.log('currentUser is', currentUser);
            // set local storage
            localStorage.setItem('isLogIn', true);
          
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.setState({
              isLogIn: true,
              currentUser: {
                ...this.state.currentUser,
                user_id: id,
                username: username
              }
            })
    }
    ).catch( error => {
        console.log(error.response.data.error);
        this.setState({
          error: error.response.data.error
        })
    });
};
handleChange = (event) => {
  this.setState({ [event.target.id]: event.target.value })
}
/*
  // Login
  login = async (currentUser) => {
    this.setState({
      currentUser: currentUser,
      isLogIn: true
    })
    this.fetchUsers();
    this.getLocation();
  }
*/
  // Logout
  logout = async () => {
    await sessionService.logOut();

    // update Log In situation of user in database
    await usersService.updateCompletionStatus(this.state.currentUser._id, {
      isLogIn: false,
    });

    // Reset Local Storage
    localStorage.clear();

    // Reset App State
    this.resetAppState();

  }

  // Reset Updated Current User
  resetUpdatedCurrentUser = () => {
    const currentUser = localStorage.getItem('currentUser');
    // const parsedUser = JSON.parse(currentUser)
    this.setState({
      currentUser: JSON.parse(currentUser)
    })
  }

  resetAppState = () => {
    this.setState({
      isLogIn: false,
      currentUser: '',
      redirect: '/',
      err: '',
      foundUsers: 0,
      position: {
        lat: null,
        long: null
      },
      users: []
    })
  }

getDailyQuestion = async () => {
  // console.log(this.props.currentUser._id);
  const response = await axios({
      method: 'get',
      url: `${BACKEND_URL}/cty/question`,
  })
  .catch(function (error) {
      console.log(error);
  });
  console.log(response);
  if(response.status) {
      this.setState({
          dailyQuestion: response.data.data
      })
  }
}

submitNewEntry = async(e) => {
  try {
      let response = '';
      let moodIndicator = 0;
      switch(this.state.newEntryMood) {
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
      if(this.state.newEntryContent) {
          // send POST to server
          console.log(this.props);
          response = await axios({
              method: 'post',
              url: `${BACKEND_URL}/entries`,
              data: {
                  user_id: this.state.currentUser.user_id,
                  username: this.state.currentUser.username,
                  date: moment().format('LL'),
                  content: this.state.newEntryContent,
                  mood: this.state.newEntryMood,
                  moodIndicator: moodIndicator
              } 
          })
          .catch(function (error) {
              console.log(error);
          });
          if(response.status) {
            this.setState({
              currentUser: {
                ...this.state.currentUser,
                hasWrittenToday: true
              },
              newEntryContent: "",
              newEntryMood: "",
              newEntryError: ""
            })
              // this.props.history.push('/');

          }
      } else {
          this.setState({
              newEntryError: "Please enter a value above"
          });

      }
  } catch(err) {
      console.log(err);
  }
}
handleNewEntryChange = e => {
  console.log(e.target);
  const { name, value } = e.target;

  this.setState({
    [name]: value
  });
};
  // When page is loaded
  componentDidMount() {
    this.getDailyQuestion();
    this.checkAuthentication();

  }
/*
    // Retrieve data from socket.io server
    socket.on('matched', (data) => this.setState({matchModalContent: data, showMatchModal: true, backgroundBlur: true}));
  }

  // update Image 
  updateAvatar = (url) => {
    const currentUser = this.state.currentUser;
    currentUser.image = url;
    this.setState({
        currentUser: currentUser
    })
  }*/
  render() {
    return (
      <Router>
        <div className="App">
          <div className="header-body">
              <Header
                isLogIn={this.state.isLogIn}
                avatar={this.state.currentUser.avatar}
                username={this.state.currentUser.username}
                logout={this.logout}
              />
              <Switch>
                <Route exact path="/" render={(props) => 
                  localStorage.getItem('isLogIn') ?
                  <Home 
                    {...props}
                    isLogIn={this.state.isLogIn}
                    currentUser={this.state.currentUser}
                    dailyQuestion={this.state.dailyQuestion}
                    login={this.login} 
                  />:
                  <Redirect to="/login"/>                
                }
                />
                <Route path="/new" render={(props)=>
                  <NewEntry
                    {...props}
                    currentUser={this.state.currentUser}
                    newEntryContent={this.state.newEntryContent}
                    newEntryMood={this.state.newEntryMood}
                    newEntryError={this.state.newEntryError}
                    submitNewEntry={this.submitNewEntry}
                    handleNewEntryChange={this.handleNewEntryChange}
                  />} 
                />
                  <Route path="/entries/edit/:id" render={(props)=>
                    <EditEntry
                      {...props}
                      currentUser={this.state.currentUser}
                    />} 
                  />
                <Route exact path="/entries" render={(props)=>
                  localStorage.getItem('isLogIn') ?
                  <Entries
                    {...props}
                    currentUser={this.state.currentUser}
                  /> :
                  <Redirect to="/login"/>                } 
                />
                <Route path="/entries/comment/:id" render={(props) => 
                <Comment
                  {...props}
                  currentUser={this.state.currentUser}
                  />} 
                />
                <Route exact path="/community" render={(props) => 
                localStorage.getItem('isLogIn') ?
                <Community
                  {...props}
                  currentUser={this.state.currentUser}
                  dailyQuestion={this.state.dailyQuestion}
                  /> :
                  <Redirect to="/login"/>   
                }  
                />
                <Route exact path="/inbox" render={(props) =>
                  localStorage.getItem('isLogIn') ?
                <Inbox
                  {...props}
                  currentUser={this.state.currentUser}
                  />:
                  <Redirect to="login"/>   
                } 
                />
                <Route exact path="/login" render={(props) =>
                  <Login
                    loginUsername= {this.state.loginUsername}
                    loginPassword= {this.state.loginPassword}
                    isLogIn= {this.state.isLogIn}
                    error= {this.state.error}
                    login={this.login}
                    handleChange={this.handleChange}
                  />
                }
                />
                <Route exact path="/signup" component={SignUp} />
                {/* <Route path="/about" component={About} />
                <Route path="/FAQ" component={FAQ} />
                <Route path="/login" render={() =>
                  <Login
                    err={this.state.err}
                    currentUser={this.state.currentUser}
                    isLogIn={this.state.isLogIn}
                    login={this.login}
                    fetchUsers={this.fetchUsers}
                  />} />
                <Route path="/signup" render={() =>
                  <SignUp
                    countries={this.state.countries}
                  />
                }
                />
                <Route path='/users' exact render={() =>
                  <Main id={this.state.backgroundBlur ? 'blur' : ''}
                    isLogIn={this.state.isLogIn}
                    users={this.state.users}
                    foundUsers={this.state.foundUsers}
                    delete={this.delete}
                    likeUser={this.likeUser}
                  />
                }
                />
                <Route path='/users/:id' exact render={(props) =>
                  <User 
                    isLogIn={this.state.isLogIn}
                    id={props.match.params.id}
                  />
                }
                />
                

                <Route path='/near' render={() =>
                  <NearByUsers
                    isLogIn={this.state.isLogIn}
                    users={this.state.nearByUsers}
                    foundUsers={this.state.nearByUsers.length}
                    delete={this.delete}
                    findNearByUser={this.findNearByUser}

                    likeUser={this.likeUser}

                  />
                }
                />
              <Route path="/profile" render={() => 
                <Profile 
                  currentUser={this.state.currentUser}
                  isLogIn={this.state.isLogIn}
                  countries={this.state.countries}
                  otherUser={false}
                  resetUpdatedCurrentUser={this.resetUpdatedCurrentUser}
                  updateAvatar={this.updateAvatar}
                />
              } 
              />
              <Route path="/messages" render={() =>
                <Chat
                  currentUser={this.state.currentUser}
                />
              }
              />
              <Route path="/notifications" render={() => 
                <Notifications
                  currentUser={this.state.currentUser}
                  isLogin={this.state.isLogin}
                />
              }
              />
              <Route path="/likes" render={() => 
                <Likes
                  currentUser={this.state.currentUser}
                  isLogin={this.state.isLogin}
                />
              }
              /> */}
            </Switch>

          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    )
  }
}

export default App;