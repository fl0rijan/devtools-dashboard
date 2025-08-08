var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SnippetSchema = new Schema({
    'title': {type: String, required: true, trim: true},
    'code': {type: String, required: true},
    'language': {type: String, required: true, trim: true},
    'description': {type: String, default: '', trim: true},
    'tags': {type: [String], default: []},
    'createdAt': {type: Date, default: Date.now},
    'createdBy': {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = mongoose.model('Snippet', SnippetSchema);
