import React from 'react';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import * as userActions from '../actions/user';


class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);
		this.isValid = this.isValid.bind(this);
	}

	isValid() {
		// redirect
		if(this.props.user) {
			browserHistory.push('/dashboard');
		} 
	}

	submitForm(e) {
		e.preventDefault();
		const userData = {
			username: this.usernameInput.value.toLowerCase(),
			fullname: this.fullnameInput.value,
			email: this.emailInput.value.toLowerCase(),
			password: this.passwordInput.value,
			password2: this.password2Input.value
		};
		this.props.dispatch(userActions.signup(userData)).then(() => {
			this.isValid();
		});
	}

	render() {
		return (
			<div>
			<h1>Signup</h1>
				<form onSubmit={this.submitForm}>
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
					<button type="submit" onClick={this.submitForm} className="btn">submit</button>
					<Link to="/login"><button className="btn">already have an account?</button></Link>
				</form>
					
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer
	}
}


export default connect(mapStateToProps)(Signup);