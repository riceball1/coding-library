const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');ß


// parse json and params in urls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// provides logging
app.use(morgan('common'));

app.use('/public', express.static('public'));


// routes

app.get('/snippets', (req, res) => {
	// fetch all snippets
});

app.post('/add-snippet', (req, res) => {
	// add new snippet
});

app.put('/update-snippet', (req, res) => {
	// update one snippet
});

app.delete('/delete-snippet', (req, res) => {
	// delete one snippet
});


// set up server for listening

app.listen(3000, () => {
	console.log('Listening on port 3000');
});


