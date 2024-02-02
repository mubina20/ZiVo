const PostModel = require("../schema/post.model");

const bcrypt = require('bcryptjs');
const Definer = require('../lib/mistake');
const assert = require('assert');
const { shapeIntoMongooseObjectId } = require('../lib/config');

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
};

module.exports = Post;