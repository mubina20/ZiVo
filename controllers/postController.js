const assert = require('assert');
const Definer = require('../lib/mistake');
const Post = require('../models/Post');

let postController = module.exports;

postController.createPhotoPost = async (req, res) => {
    try {
		console.log('POST: User posting! (createPost)');        

        assert.ok(req.files, Definer.general_error3);
        const files = req.files.map((ele) => {
            return ele.path.replace(/\\/g, '/');
        });

		const post = new Post();
        const result = await post.createPhotoPostData(req.body, files);

		res.json({ state: 'success', data: result });
	} catch (err) {
		console.log(`ERORR: createPhotoPost, ${err.message}`);
        res.json({ state: "fail", message: "There was an error creating the photos post!" });
	}
};

postController.createArticlePost = async (req, res) => {
    try {
		console.log('POST: User posting! (createPost)');

		const post = new Post();
        const result = await post.createArticlePostData(req.body);

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
        const file = req.file.path.replace(/\\/g, '/');

		const post = new Post();
        const result = await post.createVideoPostData(req.body, file);

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
        console.log("POST: one post is changed status!");

        const post = new Post();
        const result = await post.getAllPostsData();   
        
        res.json({ state: "success", data: result });        
    } catch (err){
        console.log(`ERORR: statusPost!, ${err.message}`);
		res.json({state: 'fail', message: "There was an error saved the Post!"});
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