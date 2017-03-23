
app.get('/users', (req, res) => {
	User
		.find()
		.exec()
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			console.error(err);
			res.sendStatus(500).json({message: "Issue finding users"});
		});
});


app.get('/snippets', (req, res) => {
	Snippet
		.find()
		.exec()
		.then(snippets => {
			res.json(snippets);
		})
		.catch(err => {
			console.error(err);
			res.sendStatus(500).json({message: "Issue finding snippets"});
		});
});

app.get('/snippets/:snippetid', (req, res) => {
	Snippet
		.findById(req.params.snippetid)
		.exec()
		.then(snippet => {
			res.json(snippet);
		})
		.catch(err => {
			console.error(err);
			return res.sendStatus(500).json({message: "Issue finding snippet"});
		});
});

app.post('/add-snippet', (req, res) => {
	const {title, description, code} = req.body;
	console.log(req.user);
	const newSnippet = new Snippet({
			title,
			description,
			code,
			userId: "58cf78ddb1c6af803dae26cc",
			userName: "janedoe"
	});
	// add new snippet
	newSnippet.save( (err, snippet) => {
		if(err) {
			console.error(err);
			res.sendStatus(500).json({message: "Error adding snippet"});
		}
		console.log("New Snippet Added!");
		res.sendStatus(201).json({snippet});
	});
});

app.put('/update-snippet/:snippetid', (req, res) => {
	// ensure that snippetid in request path and request body match
	if(!(req.params.snippetid && req.body.id && req.params.snippetid === req.body.id)) {
		return res.json({message: `Request path id (${req.params.snippetid}) and request body id ` +
      `(${req.body.id}) must match`});
	}

	// updatable fields
	const toUpdate = {};
	const updatableFields = ['title', 'code'];
	updatableFields.forEach(field => {
		if(field in req.body) {
			toUpdate[field] = req.body[field];
		}
	});

	//{$set: toUpdate}
	Snippet
		.findByIdAndUpdate(req.params.snippetid, {$set: toUpdate})
		.exec()
		.then(snippet => res.json(snippet))
		// should send back snippet -- but only showing "created"
		.catch(err => {
			console.error(err);
			return res.sendStatus(500).json({message: "Issue updating snippet"});
		});

});

// not working at the moment
app.delete('/delete-snippet/:snippetid', (req, res) => {
	Snippet
		.findByIdAndRemove(req.params.snippetid)
		.exec()
		.then(snippet => res.sendStatus(204).end())
		.catch(err=> {
			console.error(err);
			res.sendStatus(500).json({message: "Issue with deleting snippet"});
		})
	
});
