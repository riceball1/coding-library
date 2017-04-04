import React from 'react';

export default function Snippets(props) {
	return (
			<div className="individual-snippets" onClick={props.onClick}>
				<h1>{props.title}</h1>
				<p>{props.description}</p>
			</div>
	);
}


