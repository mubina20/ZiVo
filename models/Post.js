const PostModel = require("../schema/post.model");

const Definer = require('../lib/mistake');
const assert = require('assert');
const { shapeIntoMongooseObjectId, lookup_auth_member_liked } = require('../lib/config');
const Member = require("./Member");

class Post {
    constructor() {
        this.postModel = PostModel;
    }

    async createPostData(data, member) {
        try{
            data.mb_id = shapeIntoMongooseObjectId(member._id);
            // console.log("DATA::::", data);

            const new_post = new this.postModel(data);
            const result = await new_post.save();

            assert.ok(result, Definer.product_err1);

            // console.log("result::::", result)
            return result;
        } catch(err) {
            throw err;
        }
    };

    async getChosenPostData(member, id) {
		try {
			const auth_mb_id = shapeIntoMongooseObjectId(member?._id); 
			id = shapeIntoMongooseObjectId(id); 

			if (member) {
				const member_obj = new Member();
				await member_obj.viewChosenItemByMember(member, id, 'post');
			}

			const result = await this.postModel
				.aggregate([ 
                    { $match: { _id: id, post_status: 'active' } },
                    lookup_auth_member_liked(auth_mb_id)
                ])
				.exec();

			assert.ok(result, Definer.general_error1);

			return result[0];
		} catch (err) {
			throw err;
		}
	};
};

module.exports = Post;