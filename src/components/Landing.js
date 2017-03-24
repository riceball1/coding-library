import React from 'react';

export const Landing = () => {
	return (
		<div>
			<a href="/login">
				<button className="btn">Login</button>
			</a>
			<a href="/signup">
				<button className="btn">Sign Up</button>
			</a>
			<img src="/public/code.png" className="main-image" alt="code image" />
			<p className="slogan"></p>
		</div>
	)
}

