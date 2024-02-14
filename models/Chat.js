const ConversationModel = require("../schema/conversation.model");
const MessageModel = require("../schema/message.model");
const ChatModel = require("../schema/chat.model");

const Definer = require('../lib/mistake');
const assert = require('assert');
const { shapeIntoMongooseObjectId } = require('../lib/config');

class Chat {
    constructor() {
        this.conversationModel = ConversationModel;
        this.messageModel = MessageModel;
        this.chatModel = ChatModel;
    }

    async createChatData(member, data) {
        try{
            const sender_id = shapeIntoMongooseObjectId(member._id);
            const receiver_id = shapeIntoMongooseObjectId(data.receiver_id);

            const chat = await this.chatModel.findOne({
                members: { $all: [sender_id, receiver_id] }
            });

            if(chat) {
                return chat;
            }
        
            const new_chat = new this.chatModel({
                members: [sender_id, receiver_id]
            });
            
            const ChatResult = await new_chat.save();

            assert.ok(ChatResult, Definer.chat_error1);

            return ChatResult;
        } catch(err) {
            throw err;
        }
    };

    async findUserChatsData(member) {
        try{
            const mb_id = shapeIntoMongooseObjectId(member._id);

            const chats = await this.chatModel.find({
                members: { $in: [mb_id] }
            });
            
            assert.ok(chats, Definer.chat_error2);

            return chats;
        } catch(err) {
            throw err;
        }
    };

    async findChatData(member, inpuqry) {
        try{
            const sender_id = shapeIntoMongooseObjectId(member._id);
            const receiver_id = shapeIntoMongooseObjectId(inpuqry.receiver_id);

            const chat = await this.chatModel.findOne({
                members: { $all: [sender_id, receiver_id] }
            });
            
            assert.ok(chat, Definer.chat_error3);

            return chat;
        } catch(err) {
            throw err;
        }
    };
};

module.exports = Chat;