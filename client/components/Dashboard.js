import React from 'react';
import Sidebar from './Sidebar';

class Dashboard extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<Sidebar />
			</div>
		)
	}
}

export default Dashboard;