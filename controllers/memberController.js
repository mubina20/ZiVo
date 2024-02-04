const Member = require('../models/Member');
const jwt = require('jsonwebtoken');
const assert = require('assert');
const Definer = require('../lib/mistake');

let memberController = module.exports;

memberController.signupProcess = async (req, res) => {
    try{
        console.log("POST: Signup");
        // assert.ok(req.file, Definer.general_error1);
        

        console.log("req.file", req.file);
        console.log("req.body", req.body);

        const data = req.body;
        // data.mb_image = req.file.path; 

        const member = new Member(); 
        const new_member = await member.signupData(data); 

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
        const data = req.body; 

        const member = new Member();
        const result = await member.loginData(data);

        const token = memberController.createToken(result);
        // console.log("TOKEN:::", token);
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

		const id = req.params.id;
		const member = new Member();
		const result = await member.getChosenMemberData(req.member, id);

		// console.log('result:::', result);
		res.json({ state: 'success', data: result });
	} catch (err) {
		console.log(`ERORR, cont/getChosenMember, ${err.message}`);

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

memberController.likeMemberChosen = async (req, res) => {
	try {
		console.log('POST: User liked! (likeMemberChosen)');

		assert.ok(req.member, Definer.authentication_error5);
		
		const like_ref_id = req.body.like_ref_id;
		const group_type = req.body.group_type;
		// console.log("LIKE_REF_ID:::", like_ref_id);
		// console.log("GROUP_TYPE:::", group_type);

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
		next();
	} catch (err) {
		console.log(`ERORR: retrieveAuthMember, ${err.message}`);
		next();
	}
};