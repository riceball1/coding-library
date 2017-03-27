import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/user';
import Nav from './Nav';


class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);
	}

	submitForm(e) {
		this.setState({errors: {}});
		e.preventDefault();
		const userData = {
			username: this.usernameInput.value,
			fullname: this.fullnameInput.value,
			email: this.emailInput.value,
			password: this.passwordInput.value,
			password2: this.password2Input.value
		};
		// this returns a promise - can display errors
		this.props.dispatch(actions.signup(userData));
	}

	render() {
		return (
			<div>
			<Nav />
			<h1>Signup</h1>
				<form >
					<label>username</label>
					<input type="text" name="username" ref={ref => this.usernameInput = ref} required="required"/>
					<label>full name</label>
					<input type="text" name="fullname" ref={ref => this.fullnameInput = ref} required="required"/>
					<label>email</label>
					<input type="email" name="email" ref={ref => this.emailInput = ref} required="required"/>
					<label>password</label>
					<input type="password" name="password" ref={ref => this.passwordInput = ref} required="required"/>
					<label>confirm password</label>
					<input type="password" name="password2" ref={ref => this.password2Input = ref} required="required"/>
					<button type="button" onClick={this.submitForm}>submit</button>
				</form>
			</div>
		)
	}
}

export default connect()(Signup);