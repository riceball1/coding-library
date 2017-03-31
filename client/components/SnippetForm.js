/**
consider using codemirror for displaying a code editor like textarea in the form: http://codemirror.net/demo/theme.html#monokai
**/

import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as userActions from '../actions/user';
import * as snippetActions from '../actions/snippet';


class SnippetForm extends React.Component {

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        let newSnippet = {
            title: this.titleInput.value,
            description: this.descriptionInput.value,
            code: this.codesnippetInput.value,
            userid: this.props.user._id
        };
        this.props.dispatch(snippetActions.addSnippet(newSnippet));
    }

    render() {
        console.log(this.props);

        return (
            <div className="main">
                <header>
                    <h1 className="main-title">Create New Snippet</h1>
                </header>
                <div>
                <form onSubmit={this.submitForm} >
                    <label>title</label>
                    <input type="text" name="title" ref={ref => this.titleInput = ref} />

                    <label>description</label>
                    <input type="text" name="description" ref={ref => this.descriptionInput = ref} />
                   
                    <label>code snippet</label>
                    <textarea rows="4" cols="50" name="codesnippet" ref={ref => this.codesnippetInput = ref} className="text-box" placeholder="Please type your code here"></textarea>
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
        user: state.mainReducer.user
    }
}


export default connect(mapStateToProps)(SnippetForm);
