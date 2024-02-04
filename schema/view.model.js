const mongoose = require('mongoose');
const { like_view_group_list } = require('../lib/config.js');
const Schema = mongoose.Schema;

const viewSchema = new mongoose.Schema(
	{
		mb_id: { 
            type: Schema.Types.ObjectId, 
            required: true 
        },
		view_ref_id: { 
            type: Schema.Types.ObjectId, 
            required: true 
        },
		view_group: {
			type: String,
			required: true,
			enum: { 
                values: like_view_group_list 
            }
		}
	},
	{ timestamps: { createdAt: true } },
);

module.exports = mongoose.model('View', viewSchema);