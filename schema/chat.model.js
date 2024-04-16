const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    }]
    
    // sender_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Member",
    //     required: true
    // },
    // receiver_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Member",
    //     required: true
    // }
}, { timestamps: true });

module.exports = mongoose.model('Chat', ChatSchema);
