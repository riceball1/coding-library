import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Snippet from '../components/Snippet';
import * as userActions from '../actions/user';
import * as snippetActions from '../actions/snippet';


class Sidebar extends React.Component {	
	constructor(props) {
		super(props);
		this.toggleSidebar= this.toggleSidebar.bind(this);
		this.addSnippet = this.addSnippet.bind(this);
	}

	componentDidMount() {
		// fetch the snippets
		this.props.dispatch(snippetActions.fetchSnippets(this.props.user.username));
	}

	toggleSidebar(e) {
		e.preventDefault();
		this.props.dispatch(userActions.toggleSidebar());
	}

	addSnippet(e) {
		e.preventDefault();
		this.props.dispatch(userActions.toggleSidebar());
		browserHistory.push('/newsnippet');
	}

	render() {
		const snippets = this.props.snippets;
		const snippetsArray = snippets.map((snippet, index) => {
			return (
				<Snippet title={snippet.title} description={snippet.description} key={index}/>
			)
		});

		return (
			<div>
			<button onClick={this.toggleSidebar} className="sidebar-button">Open/Close</button>
				
				<div id="sideBar" className={(this.props.visible? "visible " : "invisible ") + "side-menu"}>
					<div className="top-menu">
						<input type="search" placeholder="search" />
					</div>
					<div className="list-snippets">
						{snippetsArray}
					</div>
					<div className="bottom-menu">
					
					<button className="btn">Settings</button> 
					<button onClick={this.addSnippet} className="btn">Create Snippet</button>
					</div>
			</div>
		</div>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer.user,
		snippets: state.snippetReducer,
		visible: state.userReducer.sidebarVisible
	}
}

export default connect(mapStateToProps)(Sidebar);