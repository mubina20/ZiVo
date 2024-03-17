const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { post_status_enums } = require('../lib/config');

const photoSchema = new mongoose.Schema({
    post_title: {
        type: String,
        required: true
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
        default: "photo",
        enum: {
            values: ['photo', 'story'],
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
    post_comment: { 
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

module.exports = mongoose.model("Photo", photoSchema);