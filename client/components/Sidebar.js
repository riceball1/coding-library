import React from 'react';
import {connect} from 'react-redux';
import Snippets from '../components/Snippets';
import SidebarTop from '../components/SidebarTop';
import SidebarBottom from '../components/SidebarBottom';
import * as actions from '../actions/user';
import * as snippetActions from '../actions/snippet';
import {browserHistory} from 'react-router';

class Sidebar extends React.Component {	
	constructor(props) {
		super(props);
		console.log(this.props);
		this.state = {
			visible: false,
			snippets: []
		};
		this.toggleSidebar= this.toggleSidebar.bind(this);
		this.logout = this.logout.bind(this);
		this.addSnippet = this.addSnippet.bind(this);
	}

	componentWillMount() {
		// fetch the snippets
		this.props.dispatch(snippetActions.fetchSnippets());
		this.setState({snippets: this.props.snippets});
	}

	toggleSidebar(e) {
		e.preventDefault();
		if(this.state.visible) {
			this.setState({visible: false});
		} else {
			this.setState({visible: true});
		}
	}

	addSnippet(e) {
		e.preventDefault();
		// redirects to creating a snippet
		browserHistory.push('/add-snippet');
		console.log('create a snippet');
	}

	logout(e){
		e.preventDefault();
		this.props.dispatch(actions.logout());
		browserHistory.push('/');
	}

	render() {
		const snippets = this.state.snippets;
		const snippetArray = snippets.map((snippet, index)=> {
			return (
				<Snippets data={snippet} />
			)
		});
		return (
			<div>
			<button onClick={this.toggleSidebar} className="sidebar-button">Open/Close</button>
				
				<div id="sideBar" className={(this.state.visible? "visible " : "invisible ") + "side-menu"}>
					<div className="top-menu">
						<input type="search" placeholder="search" />
					</div>
					{this.snippetArray}
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
		snippets: state.snippetReducer
			}
}

export default connect(mapStateToProps)(Sidebar);