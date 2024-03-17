const Definer = require("../lib/mistake");
const PostModel = require("../schema/photoPost.model");
const LikeModel = require("../schema/like.model");
const MemberModel = require("../schema/member.model");
const CommentModel = require("../schema/comment.model");
const { shapeIntoMongooseObjectId } = require("../lib/config");

class Like {
    constructor(mb_id) {
        this.likeModel = LikeModel;
        this.memberModel = MemberModel;
        this.postModel = PostModel;
        this.commentModel = CommentModel;
        this.mb_id = mb_id;
    }

    async validateTargetItem(id, group_type) {
        try{
            let result;

            switch(group_type){
                case "member":
                    result = await this.memberModel
                        .findOne({ _id: id, mb_status: "ACTIVE" })
                        .exec();
                    break;
                case "comment":
                    result = await this.commentModel
                        .findOne({ _id: id })
                        .exec();
                    break;
                case "post":
                default:
                    result = await this.postModel
                        .findOne({ _id: id, post_status: "active" })
                        .exec();
                    break;
            }

            return !!result;
        } catch(err) {
            throw err;
        }
    };

    async checkLikeExistence(like_ref_id) {
        try{
            const like = await this.likeModel
				.findOne({
					mb_id: this.mb_id,
					like_ref_id: like_ref_id,
				})
				.exec();
            // console.log("LIKE:::", like);

			return !!like;
        } catch(err) {
            throw err;
        }
    };

    async removeMemberLike(like_ref_id, group_type) {
		try {
			const result = await this.likeModel
				.findOneAndDelete({
					like_ref_id: like_ref_id,
					mb_id: this.mb_id,
				})
				.exec();

			await this.modifyItemLikeCounts(like_ref_id, group_type, -1);

			return result;
		} catch (err) {
			throw err;
		}
	};

	async insertMemberLike(like_ref_id, group_type) {
		try {
			const new_like = new this.likeModel({
				mb_id: this.mb_id,
				like_ref_id: like_ref_id,
				like_group: group_type,
			});
			const result = await new_like.save();

			// modify target likes count
			await this.modifyItemLikeCounts(like_ref_id, group_type, 1);

			return result;
		} catch (err) {
			throw new Error(Definer.mongo_validation_err1);
		}
	};

    async modifyItemLikeCounts(like_ref_id, group_type, modifier) {
		try {
			switch (group_type) {
				case 'member':
					await this.memberModel
						.findByIdAndUpdate(
							{ _id: like_ref_id },
							{ $inc: { mb_likes: modifier } }
						)
						.exec();
					break;
                case 'comment':
					await this.commentModel
						.findByIdAndUpdate(
							{ _id: like_ref_id },
							{ $inc: { comment_likes: modifier } }
						)
						.exec();
					break;
                case 'post':
                default:
                    await this.postModel
                        .findByIdAndUpdate(
                            {
                                _id: like_ref_id,
                            },
                            {
                                $inc: { post_likes: modifier },
                            },
                        )
                        .exec();
                    break;
			}

			return true;
		} catch (err) {
			throw err;
		}
	};

    // async findMyLikedPostsData(member) {
	// 	try {
	// 		// const mb_id = shapeIntoMongooseObjectId(member._id);

    //         const result = await this.likeModel
    //             // .find({
    //             //     mb_id: mb_id,
    //             //     like_group: ["photo", "video", "article"]
    //             // })
    //             .findById({ 
    //                 mb_id: mb_id, 
    //                 // like_group: { $in: ["photo", "video", "article"] } 
    //             })
    //             .exec();

	// 		assert(result, Definer.post_error7);

	// 		return result;
	// 	} catch (err) {
	// 		throw new Error(Definer.mongo_validation_err1);
	// 	}
	// };

    async findMyLikedPostsData(member) {
        try {
            const mb_id = member._id; // member obyektining ID xossasidagi qiymat
            const result = await this.likeModel
                .find({ 
                    mb_id: mb_id, 
                    // like_group: { $in: ["photo", "video", "article"] } 
                })
                .exec();
    
            assert(result, Definer.post_error7);
    
            return result;
        } catch (err) {
            throw new Error(Definer.mongo_validation_err1);
        }
    };
    
};

module.exports = Like;