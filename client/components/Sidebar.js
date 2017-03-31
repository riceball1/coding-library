import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Snippets from '../components/Snippets';
import * as userActions from '../actions/user';
import * as snippetActions from '../actions/snippet';


class Sidebar extends React.Component {	
	constructor(props) {
		super(props);
		this.toggleSidebar= this.toggleSidebar.bind(this);
		this.logout = this.logout.bind(this);
		this.addSnippet = this.addSnippet.bind(this);
	}

	componentDidMount() {
		// fetch the snippets
		this.props.dispatch(snippetActions.fetchSnippets());
	}

	toggleSidebar(e) {
		e.preventDefault();
		this.props.dispatch(userActions.toggleSidebar());
	}

	addSnippet(e) {
		e.preventDefault();
		// redirects to creating a snippet
		browserHistory.push('/newsnippet');
		console.log('create a snippet');
	}

	// should be handled on the App.js
	// logout(e){
	// 	e.preventDefault();
	// 	this.props.dispatch(actions.logout());
	// 	browserHistory.push('/');
	// }

	render() {
		const snippetsArray = this.props.snippets.map((snippet, index) => {
			return (
				<Snippet title={snippet.title} />
			)
		})

		return (
			<div>
			<button onClick={this.toggleSidebar} className="sidebar-button">Open/Close</button>
				
				<div id="sideBar" className={(this.props.visible? "visible " : "invisible ") + "side-menu"}>
					<div className="top-menu">
						<input type="search" placeholder="search" />
					</div>
					{this.snippetsArray}
					<div className="bottom-menu">
					<button onClick={this.logout}> Logout</button> <button>Settings</button> <button onClick={this.addSnippet}>Create Snippet</button>
					</div>
			</div>
		</div>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		snippets: state.snippetReducer,
		sidebarVisible: state.userReducer.sidebarVisible
	}
}

export default connect(mapStateToProps)(Sidebar);