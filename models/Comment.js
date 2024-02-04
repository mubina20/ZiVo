const CommentModel = require("../schema/comment.model");

const Definer = require('../lib/mistake');
const assert = require('assert');
const { shapeIntoMongooseObjectId } = require('../lib/config');

class Comment {
    constructor() {
        this.commentModel = CommentModel;
    }

    async createCommentData(member, data) {
        try{
            const mb_id = shapeIntoMongooseObjectId(member._id);
            const post_id = shapeIntoMongooseObjectId(data.post_id);

            const new_comment = new this.commentModel({
                comment: data.comment, 
                post_id: post_id,      
                mb_id: mb_id,
            });
            const commentResult = await new_comment.save();

            assert.ok(commentResult, Definer.comment_error1);

            // console.log("commentResult::::", commentResult)
            return commentResult;
        } catch(err) {
            throw err;
        }
    };
};

module.exports = Comment;