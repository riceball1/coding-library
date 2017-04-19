/**
consider using codemirror for displaying a code editor like textarea in the form: http://codemirror.net/demo/theme.html#monokai
**/
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as userActions from '../actions/user';
import * as snippetActions from '../actions/snippet';
import throttle from 'lodash/throttle';
import CodeMirror from 'react-codemirror';
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');

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
    if(event.target === undefined) {
        let codeValue = event;
        this.props.dispatch(snippetActions.updateCurrentSnippetLocally({name: 'code', value: codeValue}));
    } else {
        let target = event.target;
        let value = target.value;
        let name = target.name;

        this.props.dispatch(snippetActions.updateCurrentSnippetLocally({name, value}));
    }

    this.throttledFunc(); 
    
  }

  render() {
        if(this.props.snippets.length <= 0) {
            return (
                <h1 className={(this.props.visible? "left " : "") +"empty-snippets-h1"}>Keep calm and code awesome snippets.</h1>
            )
        } else {
            return (
                <div className={(this.props.visible? "left" : "") + " main"}>
                    <div>
                    <div className="snippet-menu">
                        <div onClick={this.deleteSnippet} className="snippet-button"><img src="https://github.com/riceball1/simple-code/blob/master/public/icons-for-simple-code/garbage-2.png?raw=true"/></div>
                    </div>
                    <form className="snippet-form">
                        <input type="text" name="title" placeholder="untitled" value={this.props.currentSnippet.title}  onChange={this.handleChange}/>

                        <input type="text" name="description" value={this.props.currentSnippet.description} placeholder="A short description" onChange={this.handleChange}/>
                       
                        
                         <CodeMirror value={this.props.currentSnippet.code} options={{
                            mode: 'javascript',
                            lineNumbers: true
                         }} onChange={this.handleChange} placeholder="function() {
                         example }" name="code"/>
                    </form>  
                </div>
                
            </div>)
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        snippets: state.snippetReducer.snippets,
        currentSnippet: state.snippetReducer.currentSnippet,
        visible: state.userReducer.sidebarVisible
    }
}


export default connect(mapStateToProps)(SnippetForm);
