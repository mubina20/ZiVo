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
        if (result.mb_type === 'ADMIN') {
            req.session.member = result; 
            req.session.save(function() {
                res.redirect("/admin");
            })
        } else {
                res.send(`
                    <script>alert("Admin Homepagega faqatgina admin kira oladi!"); 
                    window.location.replace('/admin'); </script>
                `);
        }
    } catch(err){
        console.log(`ERROR: Login Process! ${err.message}`);

        const error = {
            state: "Fail",
            message: "Login qilishda xatolik bo'ldi!"
        }
        res.render("error", { error: error });
    }
};

adminController.home = async (req, res) => {
    try{
        console.log("GET: Admin entered the HomePage");

        res.render("admin-homepage");
    } catch(err) {
        console.log(`ERROR: ADMIN HomePage! ${err.message}`);
        
        const error = {
            state: "Fail",
            message: "Login qilishda xatolik bo'ldi!"
        }
        res.render("error", { error: error });
    }
};

adminController.getAllMembers = async (req, res) => {
    try{
        console.log("GET: Admin entered the Members page!");

        const member = new Member();
		const members_data = await member.getAllMembersData();

		res.render('members-page', { members_data: members_data });
    } catch(err) {
        console.log(`ERROR: ADMIN Page! ${err.message}`);
        
        const error = {
            state: "Fail",
            message: "Admin Pagega kirishda xatolik bo'ldi!"
        }
        res.render("error", { error: error });
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

adminController.logout = (req, res) => {
    try{
        console.log("GET: Admin has logged out");

        req.session.destroy(function() {
            res.redirect("/admin");
        });

    } catch(err) {
        console.log(`ERROR: logout qilishda xatolik boldi! ${err.message}`);
        res.json({state: 'muvaffaqiyatsiz!', message: err.message});
    }
};