const mongoose = require("mongoose");

exports.member_status_enums = ['ACTIVE', 'PAUSED', 'BLOCKED', 'DELETED'];
exports.member_type_enums = ['ADMIN', 'GROUP_OWNER', 'USER'];
exports.member_gender_enums = ['MALE', 'FEMALE', 'UNKNOWN'];

exports.post_type_enums = ['video', 'photo', 'article', 'story'];
exports.post_status_enums = ['active', 'paused', 'saved'];

exports.like_view_group_list = ['photo', 'article', 'video','member', 'comment', 'message'];

exports.message_reaction_enum_list = ['cry', 'dislike', 'hart', 'laugh', 'angry', 'clap', 'notReaction'];

exports.notification_enum_list = ['like', 'follow', 'comment', 'message'];

exports.shapeIntoMongooseObjectId = (target) => {
    if(typeof target === "string") {
        return new mongoose.Types.ObjectId(target);
    } else return target;
};

exports.lookup_auth_member_liked = (mb_id) => {
	return {
		$lookup: {
			from: 'likes',
			let: {
				lc_liken_item_id: '$_id',
				lc_mb_id: mb_id,
				nw_my_favorite: true
			},
			pipeline: [
				{
					$match: {
						$expr: {
							$and: [{ $eq: ['$like_ref_id', '$$lc_liken_item_id'] }, { $eq: ['$mb_id', '$$lc_mb_id'] }]
						}
					}
				},
				{
					$project: {
						_id: 0,
						mb_id: 1,
						like_ref_id: 1,
						my_favorite: '$$nw_my_favorite'
					}
				}
			],
			as: 'me_liked'
		}
	};
};

exports.lookup_auth_member_following = (mb_id, origin) => {
	const follow_id = origin === 'follows' ? '$subscriber_id' : '$_id';

	return {
		$lookup: {
			from: 'follows',
			let: { // 변수. Buni - match qilish uchun ishlatyapmiz
				lc_follow_id: follow_id,
				lc_subscriber_id: mb_id,
				nw_my_following: true
			},
			pipeline: [ // array
				{
					$match: {
						$expr: {
							$and: [
								{ $eq: ['$follow_id', '$$lc_follow_id'] }, // Follow
								{ $eq: ['$subscriber_id', '$$lc_subscriber_id'] }] // Subscriber
								// $ - lookupdan tashqarida hosil qilingan mantiq , $$ - lookupni ichida o'zimiz hosil qilgan mantiq
						}
					}
				},
				{
					$project: {
						_id: 0,
						subscriber_id: 1,
						follow_id: 1,
						my_following: '$$nw_my_following'
					}
				}
			],
			as: 'me_followed'
		}
	};
};