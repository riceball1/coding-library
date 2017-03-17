const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');


const {PORT, DATABASE_URL} = require('./config.js');

// parse json and params in urls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// provides logging
app.use(morgan('common'));

app.use('/public', express.static('public'));


// routes

app.get('/', (req, res) => {
	res.send('./index.html');
});

app.get('/snippets', (req, res) => {
	// fetch all snippets
	res.send('get snippets');
});

app.post('/add-snippet', (req, res) => {
	// add new snippet
	res.send('add snippet');
});

app.put('/update-snippet', (req, res) => {
	// update one snippet
	res.send('update a snippet');
});

app.delete('/delete-snippet', (req, res) => {
	// delete one snippet
	res.send('delete a snippet');
});


app.use((req, res) => {
	res.sendStatus(404);
});

// set up server for listening

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});


