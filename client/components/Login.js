import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/user';
import Nav from './Nav';
import { browserHistory } from 'react-router';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);
		this.isValid = this.isValid.bind(this);
	}

  	isValid() {
  		if(this.props.user) {
    		//redirect
    		console.log('redirect!');
    		browserHistory.push('/dashboard');
    	} else {
    		console.log('no redirect - not valid');
    	}
  	}

	submitForm(e) {
		e.preventDefault();
		// validate the username/password
		const username = this.usernameInput.value;
		const password = this.passwordInput.value;
		// even if password is wrong it goes to login success - but doesn't
		// return a user object in userReducer <--
		this.props.dispatch(actions.login(username, password)).then(() => {
			console.log("This works!");
			this.isValid();
		});
		
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

const mapStateToProps = (state) => {
	return {
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps)(Login);