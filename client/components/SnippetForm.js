import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
//import * as userActions from '../actions/user';
import * as snippetActions from '../actions/snippet';
import Sidebar from './Sidebar';
class SnippetForm extends React.Component {

    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
    }

    componentWillMount() {
    //    this.loadUserFromToken();
    }


    submitForm(e) {
        e.preventDefault();
        const newSnippet = {
            title: this.titleInput.value,
            description: this.descriptionInput.value,
            code: this.codesnippetInput.value,
//language: this.langaugeInput.value,
            //userId: this.props.user._id
            userId: "58d9d42bbfc7f664f51c97e3"
        };

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
                    <textarea rows="4" cols="50" name="codesnippet" ref={ref => this.codesnippetInput = ref} className="text-box" placeholder="Please type your code here"></textarea>
                    <br/>
                    <select className="language-options" ref={ref => this.languageInput = ref}>
                      <option value="javascript">javascript</option>
                      <option value="css">css</option>
                      <option value="python">python</option>
                      <option value="java">java</option>
                      <option value="sql">sql</option>
                    </select>
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
