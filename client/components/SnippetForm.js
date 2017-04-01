/**
consider using codemirror for displaying a code editor like textarea in the form: http://codemirror.net/demo/theme.html#monokai
**/

import React from 'react';
import { connect } from 'react-redux';
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
        return (
            <div className="main">
                <div>
                <form className="snippet-form">
                    <input type="text" name="title" ref={ref => this.titleInput = ref} placeholder="title"/>

                    <input type="text" name="description" ref={ref => this.descriptionInput = ref} placeholder="description"/>
                   
                    <textarea rows="4" cols="50" name="codesnippet" ref={ref => this.codesnippetInput = ref} className="text-box" placeholder="Please type your code here"></textarea>
                    <br/>
                    <button className="snippet-btn" type="button" onClick={this.submitForm}>{"\u2713"}</button>
                </form>
                
                
            </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}


export default connect(mapStateToProps)(SnippetForm);
