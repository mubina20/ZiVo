const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new mongoose.Schema({
	participants: {
		type: Array,
		required: true
	},
	messages: [
		{
			type: Array,
            ref: 'Message',
            required: true,
			default: []
		}
	]
},
	{ timestamps: true }
);

module.exports = mongoose.model('Conversation', conversationSchema);