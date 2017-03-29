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
		this.state = {
			visible: false,
			snippets: []
		};
		this.handleSidebar= this.handleSidebar.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentWillMount() {
		// fetch the snippets
		this.props.dispatch(snippetActions.fetchSnippets());
	}

	handleSidebar(e) {
		e.preventDefault();
		if(this.state.visible) {
			this.setState({visible: false});
		} else {
			this.setState({visible: true});
		}
	}

	logout(e){
		e.preventDefault();
		this.props.dispatch(actions.logout());
		browserHistory.push('/');
	}

	render() {
		return (
			<div>
			<button onClick={this.handleSidebar} className="sidebar-button">Open/Close</button>
				
				<div id="sideBar" className={(this.state.visible? "visible " : "invisible ") + "side-menu"}>
					<div className="top-menu">
						<input type="search" placeholder="search" />
					</div>
					<Snippets />
		
					<div className="bottom-menu">
					<button onClick={this.logout}> Logout</button> <button>Settings</button> <button>Create Snippet</button>
					</div>
			</div>
		</div>

		)
	}
}


export default connect()(Sidebar);