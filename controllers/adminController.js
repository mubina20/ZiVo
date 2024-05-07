const Member = require('../models/Member');

let adminController = module.exports;

adminController.loginProcess = async (req, res) => {
    try{
        console.log('POST: Login Process');  

        const member = new Member();
        const result = await member.loginData(req.body);

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
            message: "There was an error Login!"
        }
        res.render("error", { error: error });
    }
};

adminController.home = async (req, res) => {
    try{
        console.log("GET: Admin entered the HomePage");

        const member = new Member();
        const members_data = await member.getAllMembersData();

        if (req.session) {
            res.render('controll-page', { members_data: members_data });
        } else {
            res.render('login');
        }
    } catch(err) {
        console.log(`ERROR: ADMIN HomePage! ${err.message}`);
        
        const error = {
            state: "Fail",
            message: "There was an error enterd to homepage!"
        }
        res.render("error", { error: error });
    }
};

adminController.updateMemberByAdmin = async (req, res) => {
	try {
		console.log("POST: Admin updated member's status");

		const member = new Member();
		const result = await member.updateMemberByAdminData(req.body);

		await res.json({ state: 'success', data: result });
	} catch (err) {
		console.log(`ERROR: updateMemberByAdmin, ${err.message}`);
		res.json({ state: 'fail!', message: "There was an error when Admin updating user's information!" });
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
        console.log("GET: Admin Logout!");

        req.session.destroy(function() {
            res.render('login');
        });

    } catch(err) {
        console.log(`ERROR: Logout! ${err.message}`);
        res.json({state: 'fail!', message: err.message});
    }
};