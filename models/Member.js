MemberModel = require('../schema/member.model');

const bcrypt = require('bcryptjs');
const Definer = require('../lib/mistake');

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
};

module.exports = Member;