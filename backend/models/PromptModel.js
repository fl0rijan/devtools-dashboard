var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PromptSchema = new Schema({
    'title': {type: String, required: true, trim: true},
    'content': {type: String, required: true},
    'tags': {type: [String], default: []},
    'category': {type: String, default: 'General', trim: true},
    'language': {type: String, default: ''}, // example: JavaScript, Python, SQL..
    'createdAt': {type: Date, default: Date.now},
    'createdBy': {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true});

module.exports = mongoose.model('Prompt', PromptSchema);
