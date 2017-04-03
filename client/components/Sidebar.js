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
		this.showMsg = this.showMsg.bind(this);
		this.searchSnippets = this.searchSnippets.bind(this);
		this.openSnippet = this.openSnippet.bind(this);
	}

	componentDidMount() {
		// fetch the snippets
;		this.props.dispatch(snippetActions.fetchSnippets(this.props.user._id));
	}

	openSnippet(e) {
		e.preventDefault();
		const snippetId = e.target.getAttribute('data-id');
		this.props.dispatch(snippetActions.getSingleSnippet(snippetId));
	}

	searchSnippets(e) {
		e.preventDefault();
		this.props.dispatch(snippetActions.filterSnippets(e.target.value));
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
	// tool tip
	showMsg(e) {
		e.preventDefault();
		console.log(this.value);
	}

	render() {
		const snippets = this.props.snippets;
		const snippetsArray = snippets.map((snippet, index) => {
			return (
				<Snippet title={snippet.title} description={snippet.description} key={snippet._id.toString()} onClick={this.openSnippet} id={snippets[index]._id}/>
			)
		});
		return (
			<div>
			<button onClick={this.toggleSidebar} className="sidebar-button">{(this.props.visible? 'close' : 'open')}</button>
				
				<div id="sideBar" className={(this.props.visible? "visible " : "invisible ") + "side-menu"}>
					<div className="top-menu">
						<input type="search" placeholder="search" onChange={this.searchSnippets}/>
					</div>
					<div className="list-snippets">
						{snippetsArray}
					</div>
					<div className="bottom-menu">
					
					<button className="btn" onMouseOver={this.showMsg} value="settings" onClick={this.openSettings}>{"\u229E"}</button> 
					<button onClick={this.addSnippet} className="btn" onMouseOver={this.showMsg} value="create snippet">{"\u270E"}</button>
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