/** Snippet Model **/

const mongoose = require('mongoose');


const snippetSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdOn: {
        type: Date,
        default: [new Date()]
    }
});

// I need to take the "code" and syntax highlight it? do I do this in the server-side or the client side with Prims.js?

const Snippet = module.exports = mongoose.model('Snippet', snippetSchema);
