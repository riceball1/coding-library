/**
consider using codemirror for displaying a code editor like textarea in the form: http://codemirror.net/demo/theme.html#monokai
**/
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as userActions from '../actions/user';
import * as snippetActions from '../actions/snippet';
import throttle from 'lodash/throttle';


class SnippetForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.deleteSnippet = this.deleteSnippet.bind(this);
    
        this.throttledFunc = throttle(() => {
            console.log(this.props.currentSnippet)
         this.props.dispatch(snippetActions.updateCurrentSnippet(this.props.currentSnippet, this.props.user._id));
     }, 1000, { 'leading': false })
    }

    deleteSnippet(e) {
        e.preventDefault();
        console.log('Delete snippet');
        this.props.dispatch(snippetActions.deleteSnippet(this.props.currentSnippet._id, this.props.user._id));
        // after deleting - clear the dashboard or move it to a new snippet
        browserHistory.push('/dashboard');       
    }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.props.dispatch(snippetActions.updateCurrentSnippetLocally({name, value}));
    this.throttledFunc();
  }

  render() {
        return (
            <div className={(this.props.visible? "left" : "") + " main"}>
                <div>
                <div className="snippet-menu">
                    <div onClick={this.deleteSnippet} className="snippet-button"><img src="https://github.com/riceball1/simple-code/blob/master/public/icons-for-simple-code/garbage-2.png?raw=true"/></div>
                    <div className="snippet-button">
                        <img src="https://github.com/riceball1/simple-code/blob/master/public/icons-for-simple-code/info.png?raw=true" />
                    </div>
                </div>
                <form className="snippet-form">
                    <input type="text" name="title" defaultValue="untitled" value={this.props.currentSnippet.title}  onChange={this.handleChange}/>

                    <input type="text" name="description" value={this.props.currentSnippet.description} defaultValue="A short description" onChange={this.handleChange}/>
                   
                    <textarea rows="4" cols="50" name="code" className="text-box" value={this.props.currentSnippet.code} onChange={this.handleChange} defaultValue="function() {
                     example }"></textarea>
                    <br/>
                </form>    
            </div>
        </div>)
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
