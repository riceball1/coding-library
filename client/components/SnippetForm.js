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
        this.autoSave = this.autoSave.bind(this);
    }

    componentDidMount() {
        this.titleInput.value = this.props.currentSnippet.title;
        this.descriptionInput.value = this.props.currentSnippet.description;
        this.codesnippetInput.value = this.props.currentSnippet.codesnippet;
    }

    autoSave() {
        // autosaving
    }

    render() {
        return (
            <div className="main">
                <div>
                <form className="snippet-form">
                    <input type="text" name="title" ref={ref => this.titleInput = ref}/>

                    <input type="text" name="description" ref={ref => this.descriptionInput = ref} placeholder="description"/>
                   
                    <textarea rows="4" cols="50" name="codesnippet" ref={ref => this.codesnippetInput = ref} className="text-box" placeholder="Please type your code here"></textarea>
                    <br/>
                </form>    
            </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        currentSnippet: state.snippetReducer.currentSnippet
    }
}


export default connect(mapStateToProps)(SnippetForm);
