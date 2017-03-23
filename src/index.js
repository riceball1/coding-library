const React = require('react');
const ReactDOM = require('react-dom');
require('./style.scss');

class App extends React.Component {
	render() {
		return (
			<div>
				<h1>{this.props.message}</h1>
			</div>
		)
	}
}

ReactDOM.render(<App message="Simple Code" />, document.getElementById('root'));