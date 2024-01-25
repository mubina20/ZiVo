const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { 
    post_type_enums, 
    post_status_enums 
} = require('../lib/config');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    comment_likes: {
        type: Number,
        required: true,
        default: 0
    },
    post_id: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: false
    },
    mb_id: { 
        type: Schema.Types.ObjectId,
        ref: "Member",
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model("Comment", CommentSchema);