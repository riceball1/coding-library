import React from 'react';

export default function Snippets(props) {
	console.log('props', props);
	return (
			<div className="individual-snippets" onClick={props.onClick} data-id={props.id}>
				<h1>{props.title}</h1>
				<p>{props.description}</p>
			</div>
	);
}


