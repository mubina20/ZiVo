const assert = require('assert');
const Definer = require('../lib/mistake');
const Chat = require('../models/Chat');

let chatController = module.exports;

chatController.createChat = async (req, res) => {
    try{
        console.log("POST: User creating chat!");

        assert.ok(req.member, Definer.authentication_error5);

        const chat = new Chat();
        const result = await chat.createChatData(req.member, req.body);

        res.json({ state: "success", data: result });
    } catch(err) {
        console.log(`ERROR: createChat, ${err.message}`);
        res.json({ state: "fail", message: "There was an error creating the chat!" });
    }
};

chatController.findMyChats = async (req, res) => {
    try{
        console.log("GET: User finding chats!");

        assert.ok(req.member, Definer.authentication_error5);

        const chat = new Chat();
        const result = await chat.findMyChatsData(req.member);

        res.json({ state: "success", data: result });
    } catch(err) {
        console.log(`ERROR: findUserChats, ${err.message}`);
        res.json({ state: "fail", message: "There was an error finding the chats!" });
    }
};

chatController.getSelectedChat = async (req, res) => {
    try{
        console.log("GET: User finding chat!");

        assert.ok(req.member, Definer.authentication_error5);

        const chat = new Chat();
        const result = await chat.getSelectedChatData(req.member, req.params);

        res.json({ state: "success", data: result });
    } catch(err) {
        console.log(`ERROR: findChat, ${err.message}`);
        res.json({ state: "fail", message: "There was an error finding the chat!" });
    }
};