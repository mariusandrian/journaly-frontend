import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import OtherEntries from '../components/OtherEntries';

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                {/* {this.props.currentUser.hasWrittenToday === false ? 
                <React.Fragment> */}
                <div className="homepage-title">
                    <h2>Daily Journal</h2>
                    <h5>Reflect on today's journey</h5>
                    <Link to="/new">
                        <button>Start Writing</button>
                    </Link>
                </div>
                <div className="home-community-qn">
                    <h3>Today's Community Question</h3>
                    {/* Import from daily questions db */}
                    <h2>Dummy Question</h2>
                    <textarea></textarea><br />
                    <button>Send</button>
                </div>
                {/* </React.Fragment>
                : ''
                <React.Fragment>
                    <div className="homepage-title">
                        <h2>Daily Feed</h2>
                        <h5>Here's what other people are writing</h5>
                        <OtherEntries currentUser={this.props.currentUser} />
                    </div>
                </React.Fragment>
                } */}
            </React.Fragment>

        )
    }
}

export default Home;