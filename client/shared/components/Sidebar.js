import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Snippet from '../../snippet/Snippet';
import * as userActions from '../../user/actions';
import * as snippetActions from '../../actions/snippet';


class Sidebar extends React.Component {	
	constructor(props) {
		super(props);
		this.toggleSidebar= this.toggleSidebar.bind(this);
		this.addSnippet = this.addSnippet.bind(this);
		this.searchSnippets = this.searchSnippets.bind(this);
		this.openSnippet = this.openSnippet.bind(this);
	}

	componentDidMount() {
		// fetch the snippets
		this.props.dispatch(snippetActions.fetchSnippets(this.props.user._id));
	}

	openSnippet(index) {
		this.props.dispatch(snippetActions.setCurrentSnippet(index));
		// browserHistory.push('/dashboard');
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
		let newSnippet = {
            title: 'Title',
            description: 'Add a short description here.',
            code: 'Write some code here.',
            userid: this.props.user._id
        };
        this.props.dispatch(snippetActions.addSnippet(newSnippet));
	}

	render() {
		const filteredSnippet = this.props.filteredSnippets;
		let snippets;
		if(filteredSnippet.length > 0) {
			snippets = filteredSnippet;
		} else {
			snippets = this.props.snippets;
		}
		
		const snippetsArray = snippets.map((snippet, index) => {
			return (
				<Snippet title={snippet.title} description={snippet.description} key={index} onClick={this.openSnippet.bind(null, index )}/>
			)
		});
		return (
			<div>
				<button onClick={this.toggleSidebar} className={(this.props.visible? "open " : "") + "sidebar-button"}><div className={(this.props.visible? "open" : "")} id="nav-icon1">
	  <span></span>
	  <span></span>
	  <span></span>
	</div>
</button>
				
				<div id="sideBar" className={(this.props.visible? "visible " : "invisible ") + "side-menu"}>
					<div className="top-menu">
						<input type="search" placeholder="search" onChange={this.searchSnippets}/>
					</div>
					<div className="list-snippets">
						{snippetsArray}
					</div>
					<div className="bottom-menu">
					
					<div onClick={this.addSnippet} value="create snippet" className="menu-btn"><img src="https://github.com/riceball1/simple-code/blob/master/public/icons-for-simple-code/edit-1.png?raw=true" /></div>
					</div>
			</div>
		</div>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer.user,
		snippets: state.snippetReducer.snippets,
		filteredSnippets: state.snippetReducer.filteredSnippets,
		visible: state.userReducer.sidebarVisible
	}
}

Sidebar.propTypes = {
	user: React.PropTypes.object,
	snippets: React.PropTypes.array,
	filterSnippets: React.PropTypes.array,
	visible: React.PropTypes.bool
}

export default connect(mapStateToProps)(Sidebar);