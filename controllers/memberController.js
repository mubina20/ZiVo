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