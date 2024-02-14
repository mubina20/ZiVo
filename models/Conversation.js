const ConversationModel = require("../schema/conversation.model");
const MessageModel = require("../schema/message.model");

const Definer = require('../lib/mistake');
const assert = require('assert');
const { shapeIntoMongooseObjectId } = require('../lib/config');

class Conversation {
    constructor() {
        this.conversationModel = ConversationModel;
        this.messageModel = MessageModel;
    }

    async sendMessageData(member, inquery, data) {
        try{
            const sender_id = shapeIntoMongooseObjectId(member._id);
            const receiver_id = shapeIntoMongooseObjectId(inquery.mb_id);
            const message = data.message;

            const new_conversation = new this.messageModel({
                sender_id: sender_id, 
                receiver_id: receiver_id,      
                message: message,
            });
            const conversationResult = await new_conversation.save();

            let conversation;

            if(!conversation) {
                await this.saveToDatabase(sender_id, receiver_id, message);
            } else {
                conversation = await this.conversationModel.findOne({
                    participants: { $all: [sender_id, receiver_id] }
                });
            }

            assert.ok(conversation, Definer.comment_error1);

            return conversation;
        } catch(err) {
            throw err;
        }
    };

    async saveToDatabase(sender_id, receiver_id, message) {
        try{

            const new_conversation = new this.conversationModel({
                participants: [sender_id, receiver_id],
                messages: message
            });
            
            const conversationResult = await new_conversation.save();
            

            assert.ok(conversationResult, Definer.comment_error1);

            return conversationResult;
        } catch(err) {
            throw err;
        }
    };

    async getMemberIdData(member, inquery) {
        try{

            const conversation = await this.conversationModel.find({
                members: { $in: inquery } 
            });

            assert.ok(conversation, Definer.comment_error1);

            return conversation;
        } catch(err) {
            throw err;
        }
    };

    async getMessageData(member, data) {
        try{
            const new_message = new this.messageModel(data);
            const messageResult = await new_message.save();

            assert.ok(messageResult, Definer.comment_error1);

            return messageResult;
        } catch(err) {
            throw err;
        }
    };
};

module.exports = Conversation;