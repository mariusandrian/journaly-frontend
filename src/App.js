import React, { Component } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
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
        username: "test",
        user_id: "5f4a24df74480ab8123919a3",
        email: "test@email.com",
        password: "$2b$10$DvMC821Zp8J7guS0SaVolOJd6MEcBxJMNaYImQNAj7vvg9E1i0OZW",
        avatar: "https://www.kayawell.com/Data/UserContentImg/2018/3/b1b977c9-671f-47af-8956-d4037e5a82fd.jpg",
        hasWrittenToday: true
      },
      isLogIn: true,
      err: '',
      currentEntry: "",
      dailyQuestion: {}
    }
  }


  // Check User Authentication
  checkAuthentication = async () => {
    const result = await sessionService.checkAuthentication();
    console.log('result is of auth check is ', result);
    if (result.isLogIn) {
      const currentUser = localStorage.getItem('currentUser');
      this.setState({
        isLogIn: true,
        currentUser: JSON.parse(currentUser)
      })
    }
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

    // Crete new socket room
    console.log('creating new socket room');
    socket.emit('join', {id: currentUser._id});
  }

  // Logout
  logout = async () => {
    await sessionService.logOut();

    // update Log In situation of user in database
    await usersService.updateCompletionStatus(this.state.currentUser._id, {
      isLogIn: false,
      position: {
        lat: null,
        long: null
      }
    });

    // Reset Local Storage
    localStorage.clear();

    // Reset App State
    this.resetAppState();

  }

  // Reset Updated Current User
  resetUpdatedCurrentUser = () => {
    const currentUser = localStorage.getItem('currentUser');
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

    // Update Log In situation of user in database
    await usersService.updateCompletionStatus(this.state.currentUser._id, {
      isLogIn: true,
      position: this.state.position
    })
  }

*/
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
                  <Home 
                    {...props}
                    currentUser={this.state.currentUser}
                    dailyQuestion={this.state.dailyQuestion}
                  />}
                />
                <Route path="/new" render={(props)=>
                  <NewEntry
                    {...props}
                    currentUser={this.state.currentUser}
                  />} 
                />
                  <Route path="/entries/edit/:id" render={(props)=>
                    <EditEntry
                      {...props}
                      currentUser={this.state.currentUser}
                    />} 
                  />
                <Route exact path="/entries" render={(props)=>
                  <Entries
                    {...props}
                    currentUser={this.state.currentUser}
                  />} 
                />
                <Route path="/entries/comment/:id" render={(props) => 
                <Comment
                  {...props}
                  currentUser={this.state.currentUser}
                  />} 
                />
                <Route exact path="/community" render={(props) => 
                <Community
                  {...props}
                  currentUser={this.state.currentUser}
                  dailyQuestion={this.state.dailyQuestion}
                  />} 
                />
                <Route exact path="/inbox" render={(props) =>
                <Inbox
                  {...props}
                  currentUser={this.state.currentUser}
                  />} 
                />
                <Route exact path="/login" component={Login} />
                {/* <Route exact path="/signup" component={SignUp} /> */}
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