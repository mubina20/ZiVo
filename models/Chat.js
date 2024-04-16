const ChatModel = require("../schema/chat.model");

const Definer = require('../lib/mistake');
const assert = require('assert');
const { shapeIntoMongooseObjectId } = require('../lib/config');

class Chat {
    constructor() {
        this.chatModel = ChatModel;
    }

    // async createChatData(member, data) {
    //     try {
    //         const sender_id = shapeIntoMongooseObjectId(member._id);
    //         const receiver_id = shapeIntoMongooseObjectId(data.receiver_id);
    
    //         const chat = await this.chatModel.findOne({
    //             $and: [
    //                 { sender_id: sender_id },
    //                 { receiver_id: receiver_id }
    //             ]
    //         });            
    
    //         if (chat) {
    //             return chat;
    //         }
    
    //         const new_chat = new this.chatModel({
    //             sender_id: sender_id, receiver_id: receiver_id 
                
    //         });
    
    //         let savedChat;
    //         try {
    //             savedChat = await new_chat.save();
    //             console.log('Yangi chat saqlandi:', savedChat);
    //         } catch (error) {
    //             console.error('Chatni saqlashda xatolik:', error);
    //             throw error;
    //         }
    
    //         assert.ok(savedChat, Definer.chat_error1);
    
    //         return savedChat;
    //     } catch (err) {
    //         throw err;
    //     }
    // };

    async createChatData(member, data) {
        try {
            const sender_id = member._id; // Yuborgan foydalanuvchi
            const receiver_id = data.receiver_id; // Qabul qiluvchi foydalanuvchi
        
            // Topshiriqlar o'rniga birinchi chatni topish
            let chat = await this.chatModel.findOne({
                members: { $all: [sender_id, receiver_id] }
            });
            
            if (chat) {
                return chat; // Agar chat topilsa, uni qaytarish
            }
        
            // Agar chat topilmagan bo'lsa, yangi chat yaratish
            chat = new this.chatModel({
                members: [sender_id, receiver_id] // Chat a'zolarini qo'shish
            });
    
            // Yangi chatni saqlash
            let savedChat;
            try {
                savedChat = await chat.save();
                console.log('Yangi chat saqlandi:', savedChat);
            } catch (error) {
                console.error('Chatni saqlashda xatolik:', error);
                throw error;
            }
        
            return savedChat; // Saqlangan chatni qaytarish
        } catch (err) {
            throw err;
        }
    }
    
    

    async findMyChatsData(myId) {
        try {
            const id = shapeIntoMongooseObjectId(myId._id);
            console.log("ID::", id);
            
            const chats = await this.chatModel.find({ members: id }).populate('members');
            
            assert.ok(chats, Definer.chat_error2);
            // console.log("chats", chats);
        
            return chats;
        } catch(err) {
            throw err;
        }
    };
    
    
    
    
    
    
    
    

    // async findUserChatsData(member) {
    //     try {
    //         const mb_id = shapeIntoMongooseObjectId(member._id);
    
    //         const chats = await this.chatModel.aggregate([
    //             {
    //                 $match: { members: mb_id }
    //             },
    //             {
    //                 $lookup: {
    //                     from: 'member',
    //                     let: { membersId: '$members' },
    //                     pipeline: [
    //                         {
    //                             $match: {
    //                                 $expr: { $and: [{ $ne: ['$_id', mb_id] }, { $in: ['$_id', '$$membersId'] }] }
    //                             }
    //                         }
    //                     ],
    //                     as: 'membersData'
    //                 }
    //             }
    //         ]);
    
    //         console.log("chats", chats);
    
    //         return chats;
    //     } catch(err) {
    //         throw err;
    //     }
    // };
    
    
    
    
    
    
    

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