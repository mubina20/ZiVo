const mongoose = require('mongoose');
const { notification_enum_list } = require('../lib/config');

const notificationSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member', 
        required: true,
    },
    recipientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: {
            value: notification_enum_list,
            message: "{VALUES} is not among permitted values!"
        }        
    },
    content: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
