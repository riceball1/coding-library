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
	}

	componentDidMount() {
		// fetch the snippets
;		this.props.dispatch(snippetActions.fetchSnippets(this.props.user._id));
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

	showMsg(e) {
		e.preventDefault();
		console.log(e.target.value);
	}

	render() {
		const snippets = this.props.snippets;
		const snippetsArray = snippets.map((snippet, index) => {
			return (
				<Snippet title={snippet.title} description={snippet.description} key={index}/>
			)
		});
		console.log('Snippets Array ', snippetsArray);
		return (
			<div>
			<button onClick={this.toggleSidebar} className="sidebar-button">{(this.props.visible? 'close' : 'open')}</button>
				
				<div id="sideBar" className={(this.props.visible? "visible " : "invisible ") + "side-menu"}>
					<div className="top-menu">
						<input type="search" placeholder="search" />
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