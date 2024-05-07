const ChatModel = require("../schema/chat.model");

const Definer = require('../lib/mistake');
const assert = require('assert');
const { shapeIntoMongooseObjectId } = require('../lib/config');

class Chat {
    constructor() {
        this.chatModel = ChatModel;
    }

    async createChatData(member, data) {
        try {
            const sender_id = member._id; 
            const receiver_id = data.receiver_id; 
        
            let chat = await this.chatModel.findOne({
                members: { $all: [sender_id, receiver_id] }
            });
            
            if (chat) {
                return chat; 
            }
        
            chat = new this.chatModel({
                members: [sender_id, receiver_id] 
            });
    
            let savedChat;
            try {
                savedChat = await chat.save();
                console.log('Yangi chat saqlandi:', savedChat);
            } catch (error) {
                console.error('Chatni saqlashda xatolik:', error);
                throw error;
            }
        
            return savedChat; 
        } catch (err) {
            throw err;
        }
    }

    async findMyChatsData(myId) {
        try {
            const id = shapeIntoMongooseObjectId(myId._id);
            
            const chats = await this.chatModel.find({ members: id }).populate('members');
            
            assert.ok(chats, Definer.chat_error2);
            // console.log("chats", chats);
        
            return chats;
        } catch(err) {
            throw err;
        }
    };

    async getSelectedChatData(member, id) {
        try{
            const sender_id = shapeIntoMongooseObjectId(member._id);
            const receiver_id = shapeIntoMongooseObjectId(id.receiver_id);

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