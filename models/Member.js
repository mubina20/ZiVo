MemberModel = require('../schema/member.model');

const bcrypt = require('bcryptjs');
const Definer = require('../lib/mistake');
const assert = require('assert');
const { shapeIntoMongooseObjectId } = require('../lib/config');

class Member {
    constructor() {
        this.memberModel = MemberModel;
    }

    async signupData(sighupData) {  
        try{
            const salt = await bcrypt.genSalt(); 
            sighupData.mb_password = await bcrypt.hash(sighupData.mb_password, salt); 
    
            const new_member = new this.memberModel(sighupData);

            let result;
            try{ 
                result = await new_member.save(); 
            } catch(mongo_error) { 
                console.log(mongo_error);
                throw new Error(Definer.authentication_error1); 
            }
            
            result.mb_password = ""; 

            return result; 
        } catch(err) { 
            throw err;
        }
    }    

    async loginData(loginData) { 
        try{
            const member = await this.memberModel 
            .findOne( 
                {mb_nick: loginData.mb_nick}, 
                {mb_nick: 1, mb_password: 1}) 
            .exec(); 
            assert.ok(member, Definer.authentication_error3); 

            const isMatch = await bcrypt.compare( 
                loginData.mb_password,  
                member.mb_password  
            );
            assert.ok(isMatch, Definer.authentication_error4); 

            return await this.memberModel
                .findOne({
                    mb_nick: loginData.mb_nick 
                })
                .exec();
        } catch(err) {
            throw err;
        }
    }

    async getChosenMemberData(member, id) { 
        try{
            const auth_mb_id = shapeIntoMongooseObjectId(member?._id);
			id = shapeIntoMongooseObjectId(id);
            // console.log("MEMBER:::", member);

            let aggregateQuery = [
				{ $match: { _id: id, mb_status: 'ACTIVE' } }, 
				{ $unset: 'mb_password' }
            ];

            // if (member) {
			// 	// Condition if not seen before
			// 	await this.viewChosenItemByMember(member, id, 'member');
            
            //     aggregateQuery.push(lookup_auth_member_liked(auth_mb_id));
			// 	aggregateQuery.push(lookup_auth_member_following(auth_mb_id, 'members'));
			// }

			const result = await this.memberModel.aggregate(aggregateQuery).exec();
			assert.ok(result, Definer.general_err2);

			return result[0];
        } catch(err) {
            throw err;
        }
    }

    async getAllMembersData() {
		try {
			const result = await this.memberModel
                .find({
                    mb_type: { $in: ['USER', 'GROUP_OWNER'] }
                })
                .exec();

			assert(result, Definer.general_err1);
			return result;
		} catch (err) {
			throw err;
		}
	}
};

module.exports = Member;