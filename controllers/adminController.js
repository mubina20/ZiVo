const Member = require('../models/Member');
const assert = require('assert');
const Definer = require('../lib/mistake');

let adminController = module.exports;

adminController.loginProcess = async (req, res) => {
    try{
        console.log('POST: Login Process'); 
        
        const data = req.body; 

        const member = new Member();
        const result = await member.loginData(data);

        // SESSION 
        req.session.member = result; 
        
        req.session.save(function() { 
            result.mb_type === 'ADMIN' 
            ? res.redirect("/admin") 
            : res.redirect("/admin")
        });

    } catch(err){
        console.log(`ERROR: Login Process! ${err.message}`);
        res.json({state: 'fail!', message: "Login Process!"});
    }
};

adminController.homepage = async (req, res) => {
    try{
        console.log("GET: Admin HomePage");

        res.render("admin-homepage");
    } catch(err) {
        console.log(`ERROR: ADMIN HomePage! ${err.message}`);
        res.json({state: 'fail!', message: "ERROR: ADMIN HomePage"});
    }
};

adminController.getAllMembers = async (req, res) => {
    try{
        console.log("GET: Admin Page");

        const member = new Member();
		const members_data = await member.getAllMembersData();

		res.render('adminPage', { members_data: members_data });
    } catch(err) {
        console.log(`ERROR: ADMIN Page! ${err.message}`);
        res.json({state: 'fail!', message: "ERROR: ADMIN Page"});
    }
};

adminController.validateAdmin = (req, res, next) => {
	if (req.session?.member?.mb_type === 'ADMIN') {
		req.member = req.session.member;
		next();
	} else {
		const html = `<script>
                        alert('Admin page: Permission denied');
                        window.location.replace('/admin');
                    <script>`;
                    
		res.end(html);
	}
};