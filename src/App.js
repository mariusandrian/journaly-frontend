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


import axios from 'axios';
const BACKEND_URL = 'http://localhost:4000';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000'
// const buildUrl = apiPath => {
//     return BACKEND_URL + apiPath;
// };

// const socket = openSocket(BACKEND_URL); 

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

  /*// Get All Countries
  getAllCountries = () => {
    const allCountries = [];
    for (let key in countries.countries) {
      allCountries.push(countries.countries[key]);
    }
    this.setState({
      countries: allCountries
    })
  }

  // Get filtered Users
  fetchUsers = async () => {
    const users = await usersService.getAll();
    const filterdUsers = users.filter(user => user.gender === this.state.currentUser.lookingForGender
      && user.age >= this.state.currentUser.lookingForAgeFrom
      && user.age <= this.state.currentUser.lookingForAgeTo);
    filterdUsers.sort(user => .5 - Math.random())
    this.setState({
      users: filterdUsers,
      foundUsers: filterdUsers.length
    });

    return filterdUsers;
  }

  // Check User Authentication
  checkAuthentication = async () => {
    const result = await sessionService.checkAuthentication();

    if (result.isLogIn) {
      const currentUser = localStorage.getItem('currentUser');
      this.setState({
        isLogIn: true,
        currentUser: JSON.parse(currentUser)
      })
      this.fetchUsers();

      // Crete new socket room after check authentication
      console.log('creating new socket room from authentication');
      socket.emit('join', {id: this.state.currentUser._id});
    }
  }

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

  // Get Location
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition)
    } else {
      console.log('Geolocation is not supported by this browser');
    }
  }

  // Get User's Position
  showPosition = async (position) => {
    this.setState({
      position: {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
    });
    // Update Log In situation of user in database
    await usersService.updateCompletionStatus(this.state.currentUser._id, {
      isLogIn: true,
      position: this.state.position
    })
  }


  // find near by users
  findNearByUser = async () => {
    const users = await usersService.getAll();
    const logInUsers = users.filter(user => user.isLogIn === true && user.gender === this.state.currentUser.lookingForGender);

    const lat1 = this.state.position.lat;
    const long1 = this.state.position.long;

    const nearByUsers = [];
    for (let i = 0; i < logInUsers.length; i++) {
      const lat2 = logInUsers[i].position.lat;
      const long2 = logInUsers[i].position.long
      const dist = Math.round(this.distance(lat1, long1, lat2, long2, 'K'));
      if (dist <= 100) nearByUsers.push({
        user: logInUsers[i],
        dist: dist
      });
    }
    this.setState({
      nearByUsers: nearByUsers
    })
    console.log(logInUsers);
  }
  // go to next user
  delete = async (id, filter) => {
    if (filter === "near") {
      const users = this.state.nearByUsers
      const index = users.findIndex(item => item.user._id === id)
      this.setState({
        nearByUsers: [
          ...users.slice(0, index),
          ...users.slice(index + 1)
        ]
      })
    } else {
      const users = this.state.users;
      const index = users.findIndex(item => item._id === id);
      this.setState({
        users: [
          ...users.slice(0, index),
          ...users.slice(index + 1)
        ]

      })
    }

  }

  // like a user
  likeUser = async (event) => {
    const likedUserId = event.currentTarget.getAttribute('a-key');
    const currentUserId = JSON.parse(localStorage.getItem('currentUser'))
    console.log(`${currentUserId._id} likes ${likedUserId} `);

    await usersService.likeUser(currentUserId._id, likedUserId);
    await socket.emit('checkMatch', { currentUserId: currentUserId._id, likedUserId: likedUserId});

    // Remove liked user from UI
    const users = this.state.users;
      const index = users.findIndex(item => item._id === likedUserId);
      this.setState({
        users: [
          ...users.slice(0, index),
          ...users.slice(index + 1)
        ]
      });
  }

  // show or close modal
   showModal = (event) => {
    this.setState({showMatchModal: !this.state.showMatchModal});
  }

  createNewChatRoomFromModal = async (event) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const otherUser = this.state.matchModalContent.otherUserId;
    const isChatExist = await usersService.isChatExist(this.state.currentUser._id, otherUser);
    console.log(isChatExist);
    if (isChatExist === true) {
      console.log('chat exists! we dont create new room');
      return;
    }
    const payload = 
    {
      users: [currentUser._id, otherUser],
      messages: [
      ]
    }
    console.log('this is new chat payload to backend')
    console.log(payload);
    
    const chatRoom = await usersService.createChatRoom(payload);
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
    // this.checkAuthentication();
    // this.getLocation();
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