import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/user';
import Nav from './Nav';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);
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

export default connect()(Login);