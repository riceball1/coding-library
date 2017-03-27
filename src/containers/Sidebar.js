import React from 'react';
import {connect} from 'react-redux';
import Snippets from '../components/Snippets';
import SidebarTop from '../components/SidebarTop';
import SidebarBottom from '../components/SidebarBottom';


class Sidebar extends React.Component {	
	constructor(props) {
		super(props);
		this.state = {
			visible: false
		};
		this.handleSidebar= this.handleSidebar.bind(this);
	}

	handleSidebar(e) {
		e.preventDefault();
		if(this.state.visible) {
			this.setState({visible: false});
		} else {
			this.setState({visible: true});
		}
	}

	render() {
		return (
			<div>
				<div id="sideBar" className={(this.state.visible? "visible " : "invisible ") + "side-menu"}>
					<SidebarTop />
					<Snippets />
					<SidebarBottom />
				</div>
				<button onClick={this.handleSidebar} className="sidebar-button">Open/Close</button>
			</div>
		)
	}
}


export default connect()(Sidebar);