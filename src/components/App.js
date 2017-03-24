import React from 'react';


class App extends React.Component {
	openNav() {
		console.log('open menu');
	}

	closeNav() {
		console.log('close menu');
	}


	render() {
		return (
			<div id="side-menu" className="sideMenu">
			<div>Search Bar | Create Notes</div>
				<p>Code Snippets Here</p>

				<div>Logout | Settings</div>
			</div>
		)
	}
}

export default App;