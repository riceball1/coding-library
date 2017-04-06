/**
consider using codemirror for displaying a code editor like textarea in the form: http://codemirror.net/demo/theme.html#monokai
**/
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
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
        // after deleting - clear the dashboard or move it to a new snippet
        browserHistory.push('/dashboard');       
    }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.props.dispatch(snippetActions.updateCurrentSnippetLocally({name, value}));
  }

  componentWillUpdate(nextProps) {
    /* use cases for dispatching events: https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/update/tapping_into_componentwillupdate.html */
    this.props.dispatch(snippetActions.updateCurrentSnippet(nextProps.currentSnippet));
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
        </div>)
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
