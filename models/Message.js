const MessageModel = require("../schema/message.model");
const ChatModel = require("../schema/chat.model");

const Definer = require('../lib/mistake');
const assert = require('assert');
const { shapeIntoMongooseObjectId } = require('../lib/config');

class Message {
    constructor() {
        this.messageModel = MessageModel;
        this.chatModel = ChatModel;
    }

    async createMessageData(member, data) {
        try{
            const sender_id = shapeIntoMongooseObjectId(member._id);
            const chat_id = shapeIntoMongooseObjectId(data.chat_id);
            const message = data.message;

            const new_message = new this.messageModel({
                sender_id: sender_id, 
                chat_id: chat_id, 
                message: message
            });
            
            const MessageResult = await new_message.save();

            assert.ok(MessageResult, Definer.message_error1);

            return MessageResult;
        } catch(err) {
            throw err;
        }
    };

    async getMessagesData(chatId) {
        try{
            const chat_id = shapeIntoMongooseObjectId(chatId);

            const message = await this.messageModel.find({chat_id});
            
            assert.ok(message, Definer.message_error2);

            return message;
        } catch(err) {
            throw err;
        }
    };

    // async reactionMessageData(data) {
    //     try{
    //         const message_id = shapeIntoMongooseObjectId(data.message_id);
    //         const message_reaction = data.message_reaction;

    //         const result = await this.messageModel
	// 		.findByIdAndUpdate(
	// 			{_id: message_id},
    //             message_reaction,
	// 			{ new: true }
	// 		).exec();
    //         assert.ok(result, Definer.message_error2);

    //         return result;
    //     } catch(err) {
    //         throw err;
    //     }
    // };

    async reactionMessageData(data) {
        try {
            const message_id = shapeIntoMongooseObjectId(data.message_id);
            const message_reaction = data.message_reaction;
    
            const result = await this.messageModel
                .findByIdAndUpdate(
                    {_id: message_id }, 
                    { message_reaction: message_reaction }, 
                    { new: true } 
                )
                .exec();
    
            assert.ok(result, Definer.message_error3);
    
            return result;
        } catch(err) {
            throw err;
        }
    };

    async editMessageData(data) {
        try {
            const message_id = shapeIntoMongooseObjectId(data.message_id);
            const editMessage = data.editMessage;
    
            const result = await this.messageModel
                .findByIdAndUpdate(
                    {_id: message_id }, 
                    { message: editMessage }, 
                    { new: true } 
                )
                .exec();
    
            assert.ok(result, Definer.message_error4);
    
            return result;
        } catch(err) {
            throw err;
        }
    };
    
};

module.exports = Message;