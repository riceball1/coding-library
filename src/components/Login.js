import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/user';
import Nav from './Nav';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);
	}

	componentWillMount() {
    	this.props.loadUserFromToken();
  	}

	submitForm(e) {
		e.preventDefault();
		const username = this.usernameInput.value;
		const password = this.passwordInput.value;
		this.props.dispatch(actions.login(username, password));
	}

	render() {
		return (
			<div>
			<Nav />
			<h1>Login</h1>
				<form >
				<label>username</label>
				<input type="text" name="username" ref={ref => this.usernameInput = ref}/>
				<label>password</label>
				<input type="password" name="password" ref={ref => this.passwordInput = ref}/>
					<button type="button" onClick={this.submitForm}>submit</button>
				</form>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
  	 loadUserFromToken: () => {
  	 	let token = sessionStorage.getItem('jwtToken');
  	 	if(!token || token === '') {//if there is no token, dont bother
  	 		return;
  	 	}

  	 //fetch user from token (if server deems it's valid token)
      dispatch(meFromToken(token))
        .then((response) => {
        	console.log(response, response.payload);
          if (!response.error) {
          	//reset token (possibly new token that was regenerated by the server)
          	sessionStorage.setItem('jwtToken', response.payload.data.token);
            dispatch(meFromTokenSuccess(response.payload))
          } else {
          	sessionStorage.removeItem('jwtToken');//remove token from storage
            dispatch(meFromTokenFailure(response.payload));
          }
        });
  	 },
     resetMe: () =>{
     	sessionStorage.removeItem('jwtToken'); //remove token from storage
     	dispatch(resetToken());
     }
  }
}

export default connect(null, mapDispatchToProps)(Login);