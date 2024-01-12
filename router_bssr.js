const { Router } = require('express'); 
const router_bssr = Router(); 

const adminController = require("./controllers/adminController");


router_bssr.get('/', adminController.home);
router_bssr.post('/login', adminController.loginProcess);

router_bssr.get(
    '/adminpage', 
    adminController.validateAdmin,
    adminController.getAllMembers
);

router_bssr.get("/logout", adminController.logout);

module.exports = router_bssr;