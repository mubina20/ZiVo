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

    async createPhotoPostData(data, photosPath, member) {
        try{
            const mb_id = shapeIntoMongooseObjectId(member._id);
            const post_title = data.post_title;
            const post_type = data.post_type;
            const post_content = photosPath;

            const new_post = new this.photoModel({
                post_title: post_title,
                post_type: post_type,
                post_content: post_content,
                member: mb_id

            });
            const result = await new_post.save();

            assert.ok(result, Definer.post_error2);

            if (post_type === "photoStory") {
                setTimeout(async () => {
                    await this.photoModel.findByIdAndDelete(result._id);
                }, 24 * 60 * 60 * 1000); 
            }

            return result;
        } catch(err) {
            throw err;
        }
    };

    async createArticlePostData(data, member) {
        try{
            const mb_id = shapeIntoMongooseObjectId(member._id);
            const post_bg_color = data.post_bg_color;
            const post_text_color = data.post_text_color;
            const post_align = data.post_align;
            const post_type = data.post_type;
            const post_content = data.post_content;

            const new_post = new this.articleModel({
                post_bg_color: post_bg_color,
                post_text_color: post_text_color,
                post_align: post_align,
                post_type: post_type,
                post_content: post_content,
                member: mb_id
            });
            const result = await new_post.save();

            assert.ok(result, Definer.post_error3);

            if (post_type === "articleStory") {
                setTimeout(async () => {
                    await this.photoModel.findByIdAndDelete(result._id);
                }, 24 * 60 * 60 * 1000); 
            }

            return result;
        } catch(err) {
            throw err;
        }
    };

    async createVideoPostData(data, videoPath, member) {
        try{
            const mb_id = shapeIntoMongooseObjectId(member._id);
            const post_title = data.post_title;
            const post_type = data.post_type;
            const post_content = videoPath;

            const new_post = new this.videoModel({
                post_title: post_title,
                post_type: post_type,
                post_content: post_content,
                member: mb_id
            });
            const result = await new_post.save();

            assert.ok(result, Definer.post_error4);

            if (post_type === "videoStory") {
                setTimeout(async () => {
                    await this.photoModel.findByIdAndDelete(result._id);
                }, 24 * 60 * 60 * 1000); 
            }

            return result;
        } catch(err) {
            throw err;
        }
    };

    async getChosenPhotosPostData(member, id) {
		try {
			const auth_mb_id = shapeIntoMongooseObjectId(member?._id); 
			id = shapeIntoMongooseObjectId(id); 

			if (member) {
				const member_obj = new Member();
				await member_obj.viewChosenItemByMember(member, id, 'photo');
			}

			const result = await this.photoModel
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

    async getChosenArticlePostData(member, id) {
		try {
			const auth_mb_id = shapeIntoMongooseObjectId(member?._id); 
			id = shapeIntoMongooseObjectId(id); 

			if (member) {
				const member_obj = new Member();
				await member_obj.viewChosenItemByMember(member, id, 'article' );
			}

			const result = await this.photoModel
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

    async getChosenVideoPostData(member, id) {
		try {
			const auth_mb_id = shapeIntoMongooseObjectId(member?._id); 
			id = shapeIntoMongooseObjectId(id); 

			if (member) {
				const member_obj = new Member();
				await member_obj.viewChosenItemByMember(member, id, 'photo');
			}

			const result = await this.photoModel
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

    async getChosenPostData(member, postType, id) {
		try {
			const auth_mb_id = shapeIntoMongooseObjectId(member?._id); 
			id = shapeIntoMongooseObjectId(id); 

            let result;

            if(postType === "photo"){
                result = await this.photoModel
                    .aggregate([
                        { $match: { _id: id, post_status: 'active' } },
                        lookup_auth_member_liked(auth_mb_id)
                    ])
                    .exec(); // exec() ni aggregate() dan keyin chaqirish
                    result = await this.photoModel.populate(result, { path: 'member' }); 
            } else if(postType === "article") {
                result = await this.articleModel
                    .aggregate([ 
                        { $match: { _id: id, post_status: 'active' } },
                        lookup_auth_member_liked(auth_mb_id)
                    ])
                    .exec();
                    result = await this.photoModel.populate(result, { path: 'member' });
            } else if(postType === "video") {
                result = await this.videoModel
                    .aggregate([ 
                        { $match: { _id: id, post_status: 'active' } },
                        lookup_auth_member_liked(auth_mb_id)
                    ])
				.exec();
                result = await this.photoModel.populate(result, { path: 'member' });
            } else{
                return undefined;
            }

            // console.log("result ::", result);
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

    async getAllPostsData() {
        try {
            const random = parseInt(Math.random() * 3);
            // console.log("random", random);

            const countArticlePost = await this.articleModel.countDocuments({ post_status: "active" });
            // console.log("count", countArticlePost);

            const countVideoPost = await this.videoModel.countDocuments({ post_status: "active" });
            // console.log("count", countVideoPost);

            const countPhotoPost = await this.photoModel.countDocuments({ post_status: "active" });
            // console.log("count", countPhotoPost);

            const postsLength = countArticlePost + countVideoPost + countPhotoPost;
            // console.log("postsLength", postsLength)
            
            let result = [];

            const articlePosts = await this.articleModel.find({ post_status: "active" }).populate('member');
            const videoPosts = await this.videoModel.find({ post_status: 'active' }).populate('member');
            const photoPosts = await this.photoModel.find({ post_status: 'active' }).populate('member');

            result.push(...articlePosts, ...videoPosts, ...photoPosts);
            result.sort(() => Math.random() - 0.5);

            assert(result.length > 0, Definer.post_error9);
            // console.log("result", result);
    
            return result;
        } catch (err) {
            throw err;
        }
    }; 
    

    async getAllVideoPostsData() {
		try {
			const result = await this.videoModel
                .find({
                    post_status: "active",
                    post_type: "video"
                })
                .exec();

			assert(result, Definer.post_error6);
			return result;
		} catch (err) {
			throw err;
		}
	};

    async getAllArticlePostsData() {
		try {
			const result = await this.articleModel
                .find({
                    post_status: "active",
                    post_type: "article"
                })
                .exec();

			assert(result, Definer.post_error7);
			return result;
		} catch (err) {
			throw err;
		}
	};

    async getAllPhotoPostsData() {
		try {
			const result = await this.photoModel
                .find({
                    post_status: "active",
                    post_type: "photo"
                })
                .exec();

			assert(result, Definer.post_error8);
			return result;
		} catch (err) {
			throw err;
		}
	};

    async postReactionData() {
		try {
			const result = await this.photoModel
                .find({
                    post_status: "active",
                    post_type: "photo"
                })
                .exec();

			assert(result, Definer.post_error8);
			return result;
		} catch (err) {
			throw err;
		}
	};
};

module.exports = Post;