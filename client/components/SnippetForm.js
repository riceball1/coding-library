/**
consider using codemirror for displaying a code editor like textarea in the form: http://codemirror.net/demo/theme.html#monokai
**/

import React from 'react';
import _ from 'underscore';
import { connect } from 'react-redux';
import * as userActions from '../actions/user';
import * as snippetActions from '../actions/snippet';


class SnippetForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.deleteSnippet = this.deleteSnippet.bind(this);
    }

    deleteSnippet(e) {
        e.preventDefault();
        console.log('Delete snippet');
        this.props.dispatch(snippetActions.deleteSnippet(this.props.currentSnippet._id));
    }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.props.dispatch(snippetActions.updateCurrentSnippetLocally({name, value}));
    // TODO: interval throttle underscore
    this.props.dispatch(snippetActions.updateCurrentSnippet(this.props.currentSnippet));
    // _.throttle(function() {console.log('This works!')}, 1000);
  }

    render() {
        if (!this.props.currentSnippet) {
            return( <div className={(this.props.visible? "left" : "")}><h2> Create new snippet to get started. </h2></div>)
        } else {
            return (
                <div className={(this.props.visible? "left" : "") + " main"}>
                    <div>
                    <form className="snippet-form">
                        <span onClick={this.deleteSnippet} className="delete-button">x</span>
                        <input type="text" name="title" value={this.props.currentSnippet.title}  onChange={this.handleChange}/>

                        <input type="text" name="description" value={this.props.currentSnippet.description} onChange={this.handleChange}/>
                       
                        <textarea rows="4" cols="50" name="code" className="text-box" value={this.props.currentSnippet.code} onChange={this.handleChange}></textarea>
                        <br/>
                    </form>    
                </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        currentSnippet: state.snippetReducer.currentSnippet,
        visible: state.userReducer.sidebarVisible
    }
}


export default connect(mapStateToProps)(SnippetForm);
