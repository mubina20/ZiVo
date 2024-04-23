const CommentModel = require("../schema/comment.model");

const Definer = require('../lib/mistake');
const assert = require('assert');
const { shapeIntoMongooseObjectId, lookup_auth_member_liked } = require('../lib/config');

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
                member: mb_id,
            });
            const commentResult = await new_comment.save();

            assert.ok(commentResult, Definer.comment_error1);

            // console.log("commentResult::::", commentResult)
            return commentResult;
        } catch(err) {
            throw err;
        }
    };

    async findChosenPostAllCommentsData(member, data) {
        try {
            const mb_id = shapeIntoMongooseObjectId(member._id);
            const post_id = shapeIntoMongooseObjectId(data.post_id);
    
            let commentResult = await this.commentModel.aggregate([
                { $match: { post_id: post_id } },
                lookup_auth_member_liked(mb_id)
            ]);
    
            // Komentariylar yo'qolishiga doir xatolikni tekshirish (kerak bo'lsa)
            // if (commentResult.length === 0) {
            //     throw new Error(Definer.comment_error1);
            // }
    
            // Komentariylarni murojaatlovchiga moslashtirish
            commentResult = await this.commentModel.populate(commentResult, { path: 'member' });
    
            // Komentariylarni qaytarish
            return commentResult;
        } catch (err) {
            throw err;
        }
    };
    
    
    
    
};

module.exports = Comment;