const Member = require('../models/Member');
const jwt = require('jsonwebtoken');
const assert = require('assert');
const Definer = require('../lib/mistake');
const Like = require('../models/Like');

let memberController = module.exports;

memberController.signupProcess = async (req, res) => {
    try{
        console.log("POST: Signup");

        const member = new Member(); 
        const new_member = await member.signupData(req.body); 

        const token = memberController.createToken(new_member);
		res.cookie('access_token', token, {
			maxAge: 6 * 3600 * 1000,
			httpOnly: false
		});

        res.json({state: 'success', data: new_member});
    } catch(error) {
        console.log(`ERROR: Signup, ${error}`);
        res.json({state: "fail", message: "Signup error!!"});
    }
};

memberController.loginProcess = async (req, res) => {
    try{
        console.log("POST: Login");

        const member = new Member();
        const result = await member.loginData(req.body);

        const token = memberController.createToken(result);
        res.cookie('access_token', token, {
			maxAge: 6 * 3600 * 1000,
			httpOnly: false,
		});

        res.json({state: 'success', data: result});
    } catch(error) {
        console.log(`ERROR: login, ${error}`);
        res.json({state: "fail", message: "Login error!!"});
    }
};

memberController.logout = (req, res) => {
    console.log('POST: LOGOUT!');
	res.cookie('access_token', null, {maxAge: 0, httpOnly: true});
    res.send("successfully LogOut");
};

memberController.createToken = (user) => {
	try {
		const upload_data = {
			_id: user._id,
			mb_nick: user.mb_nick,
			mb_type: user.mb_type
		};

		const token = jwt.sign(
			upload_data, 
			process.env.SECRET_TOKEN, 
			{ expiresIn: '6h' } 
		);

		assert.ok(token, Definer.authentication_error2);
		return token;
	} catch (error) {
        console.log(`JWT ERROR: ${error}`)
		throw error;
	};
};

memberController.getChosenMember = async (req, res) => {
	try {
		console.log('GET: One Member chosen!');
		// console.log("req.params.id", req.params.id);

		const id = req.params.id;
		const member = new Member();
		const result = await member.getChosenMemberData(req.member, id);

		res.json({ state: 'success', data: result });
	} catch (err) {
		console.log(`ERORR: getChosenMember, ${err.message}`);

		const error = {
            state: "Fail",
            message: err.message
        }
        res.render("error", { error: error });
	}
};

memberController.getAllMembers = async (req, res) => {
    try{
        console.log("GET: getAllMembers");

        const member = new Member();
		const members_data = await member.getAllMembersData();

		res.json({state: "success", data: members_data});
    } catch(err) {
        console.log(`ERROR:getAllMembers! ${err.message}`);
        
        const error = {
            state: "fail",
            message: "getAllMembers"
        }
        res.render("error", { error: error });
    }
};

memberController.updateMember = async (req, res) => {
	try {
		console.log("POST: User changing information");
		
		assert.ok(req.member, Definer.authentication_error3);
		// console.log("body::", req.body);
		// console.log("file::", req.file);

		const member = new Member();

		let result;

		if (req.file) {
            result = await member.updateMemberData(req.member, req.body, req.file);
        } else {
            result = await member.updateMemberData(req.member, req.body);
        }
		
		res.json({ state: 'success', data: result });
	} catch (err) {
		console.log(`ERORR: updateMember, ${err.message}`);
		res.json({ state: 'fail', message: "There was an error updating user information" });
	}
};

memberController.likeMemberChosen = async (req, res) => {
	try {
		console.log('POST: User liked! (likeMemberChosen)');

		assert.ok(req.member, Definer.authentication_error5);
		// console.log("req.body", req.body);
		
		const like_ref_id = req.body.like_ref_id;
		const group_type = req.body.group_type;

		const member = new Member();
		const result = await member.likeChosenItemByMember(req.member, like_ref_id, group_type);

		res.json({ state: 'success', data: result });
	} catch (err) {
		console.log(`ERORR: likeMemberChosen!, ${err.message}`);
		res.json({state: 'fail!', message: "There was an error while trying to like"});
	}
};

memberController.retrieveAuthMember = async (req, res, next) => {
	try {
		const token = req.cookies['access_token'];
		req.member = token ? jwt.verify(token, process.env.SECRET_TOKEN) : null;
		// console.log("Tokeni bor member", req.member);
		next();
	} catch (err) {
		console.log(`ERORR: retrieveAuthMember, ${err.message}`);
		next();
	}
};