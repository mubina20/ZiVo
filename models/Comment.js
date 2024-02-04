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

    async editChosenCommentData(member, data) {
        try{
            const mb_id = shapeIntoMongooseObjectId(member._id),
                comment_id = shapeIntoMongooseObjectId(data.comment_id),
                newComment = data.newComment;

            const result = await this.commentModel.findOneAndUpdate(
                { mb_id: mb_id, _id: comment_id },
                { comment: newComment },
                { new: true }
            );
            // console.log("RESULT:::", result);

            assert.ok(result, Definer.comment_error2);
            return result;
        } catch(err) {
            throw err;
        }
    };
};

module.exports = Comment;