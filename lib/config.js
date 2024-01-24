const mongoose = require("mongoose");

exports.member_status_enums = ['ACTIVE', 'PAUSED', 'BLOCKED', 'DELETED'];
exports.member_type_enums = ['ADMIN', 'GROUP_OWNER', 'USER'];
exports.member_gender_enums = ['Mafe', 'FEMALE', 'UNKNOWN'];
// exports.member_story_enums = ['image', 'text'];

exports.shapeIntoMongooseObjectId = (target) => {
    if(typeof target === "string") {
        return new mongoose.Types.ObjectId(target);
    } else return target;
};