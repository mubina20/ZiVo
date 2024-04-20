const assert = require('assert');
const Definer = require('../lib/mistake');
const Post = require('../models/Post');

let postController = module.exports;

postController.createPhotoPost = async (req, res) => {
    try {
        console.log('POST: User posting! (createPost)');    

        assert.ok(req.member, Definer.authentication_error5);
        assert.ok(req.file, Definer.general_error3);
        const file = req.file.path.replace(/\\/g, '/');

        console.log("req.body", req.body)
        // console.log("file::", file);
        // console.log("req.member", req.member);

        const post = new Post();
        const result = await post.createPhotoPostData(req.body, file, req.member);

        res.json({ state: 'success', data: result });
    } catch (err) {
        console.log(`ERROR: createPhotoPost, ${err.message}`);
        res.json({ state: "fail", message: "There was an error creating the photos post!" });
    }
};
postController.postReaction = async (req, res) => {
    try {
        console.log('POST: User posting! (createPost)');    

        assert.ok(req.member, Definer.authentication_error5);
        assert.ok(req.file, Definer.general_error3);
        const file = req.file.path.replace(/\\/g, '/');

        console.log("req.body", req.body)
        // console.log("file::", file);
        // console.log("req.member", req.member);

        const post_id = req.body.like_ref_id;
		const post_type = req.body.group_type;
		const post_reaction = req.body.reaction;

        const post = new Post();
        const result = await post.postReactionData(req.member, post_id, post_type, post_reaction);

        res.json({ state: 'success', data: result });
    } catch (err) {
        console.log(`ERROR: createPhotoPost, ${err.message}`);
        res.json({ state: "fail", message: "There was an error creating the photos post!" });
    }
};


postController.createArticlePost = async (req, res) => {
    try {
		console.log('POST: User posting! (createPost)');
        assert.ok(req.member, Definer.authentication_error5);
        // console.log("req.body::", req.body);
        // console.log("req.member", req.member);

		const post = new Post();
        const result = await post.createArticlePostData(req.body, req.member);

		res.json({ state: 'success', data: result });
	} catch (err) {
		console.log(`ERORR: createArticlePost, ${err.message}`);
        res.json({ state: "fail", message: "There was an error creating the article post!" });
	}
};

postController.createVideoPost = async (req, res) => {
    try {
		console.log('POST: User posting Video! (createVideoPost)');

        assert.ok(req.file, Definer.general_error3);
        assert.ok(req.member, Definer.authentication_error5);
        const file = req.file.path.replace(/\\/g, '/');

        console.log("req.body", req.body);
        console.log("file::", file);
        console.log("req.member", req.member);

		const post = new Post();
        const result = await post.createVideoPostData(req.body, file, req.member);

		res.json({ state: 'success', data: result });
	} catch (err) {
		console.log(`ERORR: createVideoPost, ${err.message}`);
        res.json({ state: "fail", message: "There was an error creating the video post!" });
	}
};

postController.getChosenPhotosPost = async (req, res) => {
    try {
        console.log("GET: one photo post is choosed!");

        const id = req.params.id;
        const post = new Post();
        const result = await post.getChosenPhotosPostData(req.member, id);   
        
        res.json({ state: "success", data: result });        
    } catch (err){
        console.log(`ERORR: getChosenPhotosPost!, ${err.message}`);
		res.json({state: 'fail', message: "There was an error choosing the photo Post!"});
    }
};

postController.getChosenArticlePost = async (req, res) => {
    try {
        console.log("GET: one article post is choosed!");

        const id = req.params.id;
        const post = new Post();
        const result = await post.getChosenArticlePostData(req.member, id);   
        
        res.json({ state: "success", data: result });        
    } catch (err){
        console.log(`ERORR: getChosenArticlePost!, ${err.message}`);
		res.json({state: 'fail', message: "There was an error choosing the article Post!"});
    }
};

postController.getChosenVideoPost = async (req, res) => {
    try {
        console.log("GET: one video post is choosed!");

        const id = req.params.id;
        const post = new Post();
        const result = await post.getChosenVideoPostData(req.member, id);   
        
        res.json({ state: "success", data: result });        
    } catch (err){
        console.log(`ERORR: getChosenVideoPost!, ${err.message}`);
		res.json({state: 'fail', message: "There was an error choosing the video Post!"});
    }
};

postController.statusPost = async (req, res) => {
    try {
        console.log("POST: one post is changed status!");

        const post = new Post();
        const result = await post.statusPostData(req.body);   
        
        res.json({ state: "success", data: result });        
    } catch (err){
        console.log(`ERORR: statusPost!, ${err.message}`);
		res.json({state: 'fail', message: "There was an error saved the Post!"});
    }
};

postController.getAllPosts = async (req, res) => {
    try {
        console.log("POST: All posts are being received!");

        const post = new Post();
        const result = await post.getAllPostsData();   
        
        res.json({ state: "success", data: result });        
    } catch (err){
        console.log(`ERORR: getAllPosts!, ${err.message}`);
		res.json({state: 'fail', message: "There was an error finding all posts!"});
    }
};

postController.getAllVideoPosts = async (req, res) => {
    try {
        console.log("POST: all video posts are being received!");

        const post = new Post();
        const result = await post.getAllVideoPostsData();   
        
        res.json({ state: "success", data: result });        
    } catch (err){
        console.log(`ERORR: getAllVideoPosts!, ${err.message}`);
		res.json({state: 'fail', message: "There was an error finding all video posts!"});
    }
};

postController.getAllArticlePosts = async (req, res) => {
    try {
        console.log("POST: all article posts are being received!");

        const post = new Post();
        const result = await post.getAllArticlePostsData();   
        
        res.json({ state: "success", data: result });        
    } catch (err){
        console.log(`ERORR: getAllArticlePosts!, ${err.message}`);
		res.json({state: 'fail', message: "There was an error finding all article posts!"});
    }
};

postController.getChosenPost = async (req, res) => {
    try {
        console.log("GET: One post Selected!");

        const postId = req.params.id; // Post ID
        const postType = req.params.type;
        // console.log("postId", postId);
        // console.log("postType", postType);

        const post = new Post();
        const result = await post.getChosenPostData(req.member, postType, postId);   
        
        res.json({ state: "success", data: result });        
    } catch (err){
        console.log(`ERORR: getChosenPost!, ${err.message}`);
		res.json({state: 'fail', message: "There was an error finding all article posts!"});
    }
};

postController.getAllPhotoPosts = async (req, res) => {
    try {
        console.log("POST: all photo posts are being received!");

        const post = new Post();
        const result = await post.getAllPhotoPostsData();   
        
        res.json({ state: "success", data: result });        
    } catch (err){
        console.log(`ERORR: getAllPhotoPosts!, ${err.message}`);
		res.json({state: 'fail', message: "There was an error finding all photo posts!"});
    }
};


postController.validateAuthUser = (req, res, next) => {
    if(req.session?.member?.mb_type === "USER") {
        req.member = req.session.member;
        next();
    } else 
    res.json({
        state: "fail!", 
        message: "validateAuthUser!"
    });
};