const assert = require('assert');
const Definer = require('../lib/mistake');
const Message = require('../models/Message');

let messageController = module.exports;

messageController.createMessaage = async (req, res) => {
    try{
        console.log("POST: User Creating Message!");

        assert.ok(req.member, Definer.authentication_error5);

        const messaege = new Message();
        const result = await messaege.createMessageData(req.member, req.body);

        res.json({ state: "success", data: result });
    } catch(err) {
        console.log(`ERROR: createMessaage, ${err.message}`);
        res.json({ state: "fail", message: "There was an error creating the message!" });
    }
};

messageController.getMessages = async (req, res) => {
    try{
        console.log("GET: user received all messages!");

        assert.ok(req.member, Definer.authentication_error5);

        const messaege = new Message();
        const result = await messaege.getMessagesData(req.params.chat_id);

        res.json({ state: "success", data: result });
    } catch(err) {
        console.log(`ERROR: getMessages, ${err.message}`);
        res.json({ state: "fail", message: "There was an error finding the messages!" });
    }
};

messageController.reactionMessage = async (req, res) => {
    try{
        console.log("POST: User reacting to message!");

        assert.ok(req.member, Definer.authentication_error5);

        const messaege = new Message();
        const result = await messaege.reactionMessageData(req.body);

        res.json({ state: "success", data: result });
    } catch(err) {
        console.log(`ERROR: reactionMessage, ${err.message}`);
        res.json({ state: "fail", message: "There was an error reacting to message!" });
    }
};

messageController.editMessage = async (req, res) => {
    try{
        console.log("POST: User editing to message!");

        assert.ok(req.member, Definer.authentication_error5);

        const messaege = new Message();
        const result = await messaege.editMessageData(req.body);

        res.json({ state: "success", data: result });
    } catch(err) {
        console.log(`ERROR: editMessage, ${err.message}`);
        res.json({ state: "fail", message: "There was an error editing to message!" });
    }
};

messageController.deleteMessage = async (req, res) => {
    try{
        console.log("POST: User deleted to message!");

        assert.ok(req.member, Definer.authentication_error5);

        const messaege = new Message();
        const result = await messaege.deleteMessageData(req.body);

        res.json({ state: "success", data: result });
    } catch(err) {
        console.log(`ERROR: deleteMessage, ${err.message}`);
        res.json({ state: "fail", message: "There was an error deleted to message!" });
    }
};