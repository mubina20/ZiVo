const PhotoModel = require("../schema/photoPost.model");
const ArticleModel = require("../schema/articlePost.model");
const VideoModel = require("../schema/videoPost.model");

const Definer = require('../lib/mistake');
const assert = require('assert');
const { shapeIntoMongooseObjectId, lookup_auth_member_liked } = require('../lib/config');
const Member = require("./Member");

class Post {
    constructor() {
        this.photoModel = PhotoModel;
        this.articleModel = ArticleModel;
        this.videoModel = VideoModel;
    }

    async createPhotoPostData(data, photosPath) {
        try{
            const post_title = data.post_title;
            const post_type = data.post_type;
            const post_content = photosPath;

            const new_post = new this.photoModel({
                post_title: post_title,
                post_type: post_type,
                post_content: post_content
            });
            const result = await new_post.save();

            assert.ok(result, Definer.post_error2);

            return result;
        } catch(err) {
            throw err;
        }
    };

    async createArticlePostData(member, data) {
        try{
            // mb_id = shapeIntoMongooseObjectId(member._id);
            const post_title = data.post_title;
            const post_type = data.post_type;
            const post_content = data.post_content;

            console.log("DATA::::", data);

            const new_post = new this.articleModel({
                post_title: post_title,
                post_type: post_type,
                post_content: post_content
            });
            const result = await new_post.save();

            assert.ok(result, Definer.post_error3);

            // console.log("result::::", result)
            return result;
        } catch(err) {
            throw err;
        }
    };

    async createVideoPostData(data, videoPath) {
        try{
            const post_title = data.post_title;
            const post_type = data.post_type;
            const post_content = videoPath;

            const new_post = new this.videoModel({
                post_title: post_title,
                post_type: post_type,
                post_content: post_content
            });
            const result = await new_post.save();

            assert.ok(result, Definer.post_error4);

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

    async statusPostData(data) {
		try {
			const post_id = shapeIntoMongooseObjectId(data.post_id); 
            const status = data.post_status

			const result = await this.postModel
                .findByIdAndUpdate(
                    {_id: post_id }, 
                    { post_status: status }, 
                    { new: true } 
                )
                .exec();

			assert.ok(result, Definer.post_error1);

			return result;
		} catch (err) {
			throw err;
		}
	};
};

module.exports = Post;