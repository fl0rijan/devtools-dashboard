var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookmarkSchema = new Schema({
    'title': {type: String, required: true, trim: true},
    'url': {type: String, required: true, trim: true},
    'category': {type: String, default: 'General', trim: true},
    'tags': {type: [String], default: []},
    'description': {type: String, default: '', trim: true},
    'createdBy': {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    public: {type: Boolean, default: false},
    'createdAt': {type: Date, default: Date.now},
    starredBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
}, {timestamps: true});

module.exports = mongoose.model('Bookmark', BookmarkSchema);
