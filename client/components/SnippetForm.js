import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as actions from '../actions/token';
import Sidebar from './Sidebar';
class SnippetForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
        this.loadUserFromToken = this.loadUserFromToken.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount() {
        this.loadUserFromToken();
    }

   componentWillReceiveProps(nextProps) {
       this.setState({user: nextProps.user.user});
       console.log(nextProps.user.user);
   }
    loadUserFromToken() {
        let token = localStorage.getItem('jwtToken');
        console.log("token", token);
        if (!token || token === '') {
            //if there is no token, dont bother
            return;
        }
        //fetch user from token (if server deems it’s valid token)
        this.props.dispatch(actions.meFromToken(token));
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
        this.props.dispatch(actions.signup(userData)).then(() => {
            this.isValid();
        });
    }


    render() {
        return (
            <div className="main">
                <header>
                    <h1 className="main-title">Create New Snippet</h1>
                </header>
                <div>
                <Sidebar />
                <form >
                    <label>title</label>
                    <input type="text" name="title" ref={ref => this.titleInput = ref} required="required"/>

                    <label>description</label>
                    <input type="text" name="description" ref={ref => this.descriptionInput = ref} required="required"/>
                   
                    <label>code snippet</label>
                    <input type="text" name="codesnippet" ref={ref => this.codesnippetInput = ref} required="required"/>
                    <button type="button" onClick={this.submitForm}>submit</button>
                </form>
                
                <Link to="/dashboard">
                    <button>Dashboard</button>
                </Link>
                
                
            </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.tokenReducer
    }
}


export default connect(mapStateToProps)(SnippetForm);
