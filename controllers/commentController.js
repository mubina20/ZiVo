const assert = require('assert');
const Definer = require('../lib/mistake');
const Follow = require('../models/Follow');
const Comment = require('../models/Comment');

let commentController = module.exports;

commentController.createComment = async (req, res) => {
    try{
        console.log("POST: User commented!");

        assert.ok(req.member, Definer.authentication_error5);

        const comment = new Comment();
        const result = await comment.createCommentData(req.member, req.body);

        res.json({ state: "success", data: result });
    } catch(err) {
        console.log(`ERROR: createComment, ${err.message}`);
        res.json({ state: "fail", message: "There was an error commenting!" });
    }
};