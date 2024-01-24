const mongoose = require('mongoose');
const { 
    member_status_enums,
    member_type_enums
} = require('../lib/config');

const memberSchema = new mongoose.Schema({
    mb_name: {
        type: String,
        required: true
    },
    mb_surname: {
        type: String,
        required: true
    },
    mb_birthday: {
        type: Number,
        required: true
    },
    mb_gender: {
        type: String,
        required: false
    },
    mb_nick: {
        type: String,
        required: true,
        index: {unique: true, sparse: true} 
    },
    mb_email: {
        type: String,
        required: function() {
            return !(this.mb_phone);
        },
        index: {unique: true, sparse: true}
    },
    mb_phone: {
        type: String,
        required: function() {
            return !(this.mb_email);
        },
        index: {unique: true, sparse: true}
    }, 
    mb_password: {
        type: String,
        required: true,
        select: false
    },
    mb_type: {
        type: String,
        required: false,
        default: "USER", 
        enum: {
            values: member_type_enums, 
            message: "{VALUES} is not among permitted values!"
        }
    },
    mb_status: {
        type: String,
        required: false,
        default: "ACTIVE", 
        enum: {
            values: member_status_enums, 
            message: "{VALUES} is not among permitted values!"
        }
    },
    mb_address: {
        type: String,
        required: false
    },
    mb_description: {
        type: String,
        required: false
    },
    mb_country: {
        type: String,
        required: false
    },
    mb_profile_image: {
        type: String,
        required: false
    },
    mb_background_image: {
        type: String,
        required: false
    },
    mb_views: {
        type: Number,
        required: false, 
        default: 0
    },
    mb_likes: {
        type: Number,
        required: false, 
        default: 0
    },
    mb_notification: {
        type: Number,
        required: false, 
        default: 0
    },
    mb_follow_count: {
        type: Number,
        required: false, 
        default: 0
    },
    mb_subscriber_count: {
        type: Number,
        required: false,
        default: 0
    }
}, 
    {timestamps: true}
);

module.exports = mongoose.model("Member", memberSchema);