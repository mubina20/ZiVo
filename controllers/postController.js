const Member = require('../models/Member');
const jwt = require('jsonwebtoken');
const assert = require('assert');
const Definer = require('../lib/mistake');
const Post = require('../models/Post');

let postController = module.exports;

postController.createPost = async (req, res) => {
    try {
		console.log('POST: User posting! (createPost)');

        let data = req.body;
        // data.post_images = req.files.map((ele) => {
        //     return ele.path.replace(/\\/g, '/');
        // });
        console.log("DATA :::", data);
        console.log("req.member", req.member)

		const post = new Post();
        const result = await post.createPostData(data, req.member);

		res.json({ state: 'success', data: result });
	} catch (err) {
		console.log(`ERORR: createPost, ${err.message}`);

		const error = {
            state: "Fail",
            message: err.message
        }
        res.render("error", { error: error });
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