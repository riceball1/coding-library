import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as actions from '../actions/token';
import * as snippetActions from '../actions/snippet';
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
   }
    loadUserFromToken() {
        let token = localStorage.getItem('jwtToken');
        console.log(token? "Token true": "Token false");
        if (!token || token === '') {
            //if there is no token, dont bother
            return;
        }
        this.props.dispatch(actions.meFromToken(token));
    }

    submitForm(e) {
        e.preventDefault();
        const newSnippet = {
            title: this.titleInput.value,
            description: this.descriptionInput.value,
            code: this.codesnippetInput.value,
            userId: this.state.user._id
        };

        console.log(newSnippet);
        this.props.dispatch(snippetActions.addSnippet(newSnippet));
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
                    <textarea rows="4" cols="50" name="codesnippet" ref={ref => this.codesnippetInput = ref} required="required"></textarea>
                    <br/>
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
