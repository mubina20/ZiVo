const mongoose = require("mongoose");

exports.member_status_enums = ['ACTIVE', 'PAUSED', 'BLOCKED', 'DELETED'];
exports.member_type_enums = ['ADMIN', 'GROUP_OWNER', 'USER'];
exports.member_gender_enums = ['Mafe', 'FEMALE', 'UNKNOWN'];

exports.post_type_enums = ['video', 'photo', 'article', 'story'];
exports.post_status_enums = ['ACTIVE', 'PAUSED', 'SAVED'];

exports.like_view_group_list = ['post', 'member', 'comment'];

exports.post_id_enum_list = ['celebrity', 'evaluation', 'story'];

exports.shapeIntoMongooseObjectId = (target) => {
    if(typeof target === "string") {
        return new mongoose.Types.ObjectId(target);
    } else return target;
};