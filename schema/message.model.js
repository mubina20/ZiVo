const mongoose = require('mongoose');
const { message_reaction_enum_list } = require('../lib/config');

const messageSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    chat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    message_reaction: {
        type: String,
        required: false,
        default: "notReaction",
        enum: { 
            values: message_reaction_enum_list,
            message: "{VALUES} is not among permitted values!"
        }
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);