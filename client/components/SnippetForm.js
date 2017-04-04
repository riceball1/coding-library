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
    }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.props.dispatch(snippetActions.updateCurrentSnippetLocally({name, value}));
    // TODO: interval throttle underscore
    this.props.dispatch(snippetActions.updateCurrentSnippet(this.props.currentSnippet));
    _.throttle(() => {console.log('This works!')}, 8000);
  }

    render() {
        if (!this.props.currentSnippet) {
            return( <h2> Create new snippet to get started. </h2>)
        } else {
            return (
                <div className="main">
                    <div>
                    <form className="snippet-form">
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
        currentSnippet: state.snippetReducer.currentSnippet
    }
}


export default connect(mapStateToProps)(SnippetForm);
