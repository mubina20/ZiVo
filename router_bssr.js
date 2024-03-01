const { Router } = require('express'); 
const router_bssr = Router(); 

const adminController = require("./controllers/adminController");


router_bssr.get('/', adminController.home);
router_bssr.post('/login', adminController.loginProcess);
router_bssr.get("/logout", adminController.logout);

router_bssr.get(
    '/members', 
    adminController.validateAdmin,
    adminController.getAllMembers
);
router_bssr.post( 
    "/members/edit",
    adminController.validateAdmin,
    adminController.updateMemberByAdmin 
);
router_bssr.post( 
    "/members/country",
    adminController.validateAdmin,
    adminController.getMembersByCountry 
);

module.exports = router_bssr;