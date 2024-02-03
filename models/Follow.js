const assert = require('assert');
const Definer = require('../lib/mistake');
const FollowModel = require('../schema/follow.model');
const MemberModel = require('../schema/member.model');
const { 
    shapeIntoMongooseObjectId, 
    lookup_auth_member_following 
} = require('../lib/config');


class Follow {
    constructor() {
        this.memberModel = MemberModel;
        this.followModel = FollowModel;
    }

    async subscribeData(member, data) {
        try{
            assert.ok(member._id !== data.mb_id, Definer.follow_error1);

            const subscriber_id = shapeIntoMongooseObjectId(member._id);
            const follow_id = shapeIntoMongooseObjectId(data.mb_id);
            
            const member_data = await this.memberModel
                .findById({ _id: follow_id })
                .exec();
            
            assert.ok(member_data, Definer.general_error2);

            const result = await this.createSubscriptionData(
                follow_id,
                subscriber_id
            );

            assert.ok(result, Definer.general_error1);

            await this.modifyMemberFollowCounts(follow_id, 'subscriber_change', 1);
            await this.modifyMemberFollowCounts(subscriber_id, 'follow_change', 1);

            return true;
        } catch(err) {
            throw err;
        }
    };

    async createSubscriptionData(follow_id, subscriber_id) {
        try{
            const new_follow = new this.followModel({
                follow_id: follow_id,
                subscriber_id: subscriber_id
            });

            return await new_follow.save();

        } catch(mongoDB_error){
            console.log("MongoDB_ERROR:::", mongoDB_error);
            throw new Error(Definer.follow_error2);
        }
    };

    async modifyMemberFollowCounts(mb_id, type, modifier) {
        try{
            if(type === 'follow_change'){
                await this.memberModel
                    .findByIdAndUpdate(
                        { _id: mb_id },
                        { $inc: { mb_follow_count: modifier } }
                    )
                    .exec();
            } else if(type === 'subscriber_change'){
                await this.memberModel
                    .findByIdAndUpdate(
                        { _id: mb_id },
                        { $inc: { mb_subscriber_count: modifier } }
                    )
                    .exec();
            }

            return true;
        } catch(err) {
            throw err;
        }
    };

};

module.exports = Follow;