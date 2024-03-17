const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { post_status_enums } = require('../lib/config');

const articleSchema = new mongoose.Schema({
    post_bg_color: {
        type: String,
        required: false
    },
    post_text_color: {
        type: String,
        required: false
    },
    post_align: {
        type: String,
        default: "start",
        required: false
    },
    post_status: {
        type: String,
        required: true,
        default: "active",
        enum: {
            values: post_status_enums,
            message: "{VALUES} is not among permitted values!"
        }
    },
    post_type: {
        type: String,
        required: true,
        default: "article",
        enum: {
            values: ['article', 'story'],
            message: "{VALUES} is not among permitted values!"
        }
    },
    post_content: {
        type: String,
        required: true
    },
    post_description: {
        type: String,
        required: false
    },
    post_views: {
        type: Number,
        required: false, 
        default: 0
    },
    post_likes: {
        type: Number,
        required: false, 
        default: 0
    },
    comment: { 
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: false
    },
    mb_id: { 
        type: Schema.Types.ObjectId,
        ref: "Member",
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model("Article", articleSchema);