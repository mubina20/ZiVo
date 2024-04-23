const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavedSchema = new mongoose.Schema(
	{
		savedPost: {
            type: Schema.Types.ObjectId,
            required: true
        },
		post_type: {
            type: String,
            required: false
        },
		member: {
            type: Schema.Types.ObjectId,
            ref: "Member",
            required: true
        }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('SavedPost', SavedSchema);