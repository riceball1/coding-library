import React from 'react';
import {connect} from 'react-redux';
import Snippets from '../components/Snippets';
import SidebarTop from '../components/SidebarTop';
import SidebarBottom from '../components/SidebarBottom';
import * as tokenActions from '../actions/token';
import * as snippetActions from '../actions/snippet';
import {browserHistory} from 'react-router';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		// console.log(this.props);

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
		this.props.dispatch(tokenActions.toggleSidebar());
	}

	addSnippet(e) {
		e.preventDefault();
		// redirects to creating a snippet
		browserHistory.push('/add-snippet');
		console.log('create a snippet');
	}

	logout(e){
		// e.preventDefault();
		// this.props.dispatch(actions.logout());
		// browserHistory.push('/');
	}

	render() {

		return (
			<div>
			<button onClick={this.toggleSidebar} className="sidebar-button">Open/Close</button>

			<div id="sideBar" className={(this.props.sidebarVisible? "visible " : "invisible ") + "side-menu"}>
			<div className="top-menu">
			<input type="search" placeholder="search" />
			</div>
			<Snippets data={this.props.snippets} />
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
		sidebarVisible: state.tokenReducer.sidebarVisible
	}
}

export default connect(mapStateToProps)(Sidebar);
