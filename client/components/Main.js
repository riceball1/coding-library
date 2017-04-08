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
                          <li><Link to="/login">Login</Link></li>
                          <li><Link to="/signup">SignUp</Link></li>
                     </ul>
                </nav>)}
            	<div>
	            	<div className="slogan">Create code snippets to keep yourself organized</div>
	            	<Link to="/login">
                          <button className="btn">Login</button>
                     </Link>
                     <Link to="/signup">
                          <button className="btn">Sign Up</button>
                     </Link>
					<img src="https://i.imgur.com/dlRrvfT.png" alt="code image" className="main-image" />

				</div>

				<div className="parallax"></div>
				
				<div className="other-parallax" id="#features">
				
					<div className="row">
						<div className="col-6">
						<h2>Faster Organization</h2>
						<p>Easily search code snippets and keep organized.</p>
						</div>
						<div className="col-6">
						<h2>Cleaner Design</h2>
						<p>The minimal design helps keep you focus on writing clean code, and makes it easy to search.</p>
						</div>
						<div className="col-12">
							<p className="slogan">Make Snippets. Save. Search.</p>
						</div>
					</div>
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
