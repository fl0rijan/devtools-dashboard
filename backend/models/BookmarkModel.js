var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookmarkSchema = new Schema({
    'title': {type: String, required: true, trim: true},
    'url': {type: String, required: true, trim: true},
    'category': {type: String, default: 'General', trim: true},
    'tags': {type: [String], default: []},
    'description': {type: String, default: '', trim: true},
    'createdAt': {type: Date, default: Date.now}
}, {timestamps: true});

module.exports = mongoose.model('Bookmark', BookmarkSchema);
