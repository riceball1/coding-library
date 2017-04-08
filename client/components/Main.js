import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as userActions from '../actions/user';


class Main extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main">
            	{!this.props.user && (<nav className="main-nav">
                     <ul>
                          <li><Link to="#features">Features</Link></li>
                          <li><Link to="#contact">Contact</Link></li>
                          <li><Link to="#">Simple Code</Link></li>
                     </ul>
                </nav>)}
            	<div className="other-parallax">
	            	<div className="slogan">Create code snippets to keep yourself organized</div>
					<Link to="/login">
						<button className="btn">Login</button>
					</Link>
					<Link to="/signup">
						<button className="btn">Sign Up</button>
					</Link>
				</div>

				<div className="parallax"></div>
				
				<div className="other-parallax">
				
					<div className="row">
						<div className="col-6">
						DIV
						</div>
						<div className="col-6">
						DIV
						</div>
					</div>
				</div>

				<div className="parallax">
				</div>
				<div className="other-parallax">
				
				<p>Make Snippets. Save. Search. </p>
				</div>
			</div>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps)(Main);
