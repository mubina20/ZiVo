const assert = require('assert');
const Definer = require('../lib/mistake');
const Follow = require('../models/Follow');
const Comment = require('../models/Comment');

let commentController = module.exports;

commentController.createComment = async (req, res) => {
    try{
        console.log("POST: User commented!");

        console.log("REQ<BODY:::", req.body)

        const comment = new Comment();
        const result = await comment.createCommentData(req.member, req.body);

        res.json({ state: "success", data: result });
    } catch(err) {
        console.log(`ERROR: createComment, ${err.message}`);
        res.json({ state: "fail", message: "There was an error commenting!" });
    }
};

commentController.editChosenComment = async (req, res) => {
    try{
        console.log("POST: User editing comment!");
        // console.log("req.body:::", req.body);

        assert.ok(req.member, Definer.authentication_error5);

        const comment = new Comment();
        const result = await comment.editChosenCommentData(req.member, req.body);

        res.json({state: 'success', data: result});
    } catch(err) {
        console.log(`ERROR: editChosenComment!, ${err.message}`); 
        res.json({state: 'fail', message: "There was an error editing comment!"});
    }
}