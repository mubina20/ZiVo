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

    // Subscribe
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

    // Logic of saving to DataBase
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

    // Following & Subscriber count
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

    // UnSubscriber
    async unsubscribeData(member, data) {
        try{
            const subscriber_id = shapeIntoMongooseObjectId(member?._id);
            const follow_id = shapeIntoMongooseObjectId(data.mb_id);

            const result = await this.followModel.findOneAndDelete({
                follow_id: follow_id,
                subscriber_id: subscriber_id
            });

            assert.ok(result, Definer.general_error1);

            await this.modifyMemberFollowCounts(follow_id, 'subscriber_change', -1);
            await this.modifyMemberFollowCounts(subscriber_id, 'follow_change', -1);

            return true;
        } catch(err) {
            throw err;
        }
    };

    // Member's Followings
    async getMemberFollowingsData(inquery) {
        try {
            const subscriber_id = shapeIntoMongooseObjectId(inquery.mb_id),
                page = inquery.page * 1,
                limit = inquery.limit * 1;
    
            const result = await this.followModel
            .aggregate([
                { $match: { subscriber_id: subscriber_id } },
                { $sort: { createdAt: -1 } },
                { $skip: (page - 1) * limit },
                { $limit: limit },
                {
                    $lookup: {
                    from: "members",
                    localField: "follow_id",
                    foreignField: "_id",
                    as: "follow_member_data",
                    },
                },
                { $unwind: "$follow_member_data" }
            ])
            .exec();
    
            assert.ok(result, Definer.follow_error3);
            // console.log("RESULT:::", result);

            return result;
        } catch (err) {
            throw err;
        }
    };
};

module.exports = Follow;