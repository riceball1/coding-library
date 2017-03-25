import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/user';

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.submitForm = this.submitForm.bind(this);
	}

	submitForm(e) {
		e.preventDefault();
		const username = this.usernameInput.value;
		const fullname = this.fullnameInput.value;
		const email = this.emailInput.value;
		const password = this.passwordInput.value;
		const password2 = this.password2Input.value;
		this.props.dispatch(actions.signup(username, fullname, password, password2, email));
	}

	render() {
		return (
			<div>
			Signup
				<form >
					<input type="text" name="username" ref={ref => this.usernameInput = ref}/>
					<input type="text" name="fullname" ref={ref => this.fullnameInput = ref}/>
					<input type="text" name="email" ref={ref => this.emailInput = ref}/>
					<input type="text" name="password" ref={ref => this.passwordInput = ref}/>
					<input type="text" name="password2" ref={ref => this.password2Input = ref}/>
					<button type="button" onClick={this.submitForm}>submit</button>
				</form>
			</div>
		)
	}
}

export default connect()(Signup);