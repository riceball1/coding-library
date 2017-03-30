import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Sidebar from './Sidebar';
import * as userActions from '../actions/user';
import * as snippetActions from '../actions/snippet';
import Nav from './Nav';
class App extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount() {

    //    this.loadUserFromToken();
  }

  componentDidMount() {
            // LOADING USEER HAPPENS HERE
    //    console.log(this.props.user);
  }

  // loadUserFromToken() {
  //     let token = localStorage.getItem('jwtToken');
  //     console.log("token", token);
  //     if (!token || token === '') {
  //     //if there is no token, dont bother
  //         return;
  //     }
  //     //fetch user from token (if server deems it’s valid token)
  //     this.props.dispatch(actions.meFromToken(token)).then(() => {
  //         browserHistory.push('/dashboard');
  //     });
  // }


  render() {
    return (
      <div className="main">
        <Sidebar />

        <header>
        <h1 className="main-title">Simple Code</h1>
        </header>
        <Nav />
        <div>-----</div>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.tokenReducer
  }
}


export default connect(mapStateToProps)(App);
