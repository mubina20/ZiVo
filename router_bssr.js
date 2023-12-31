const { Router } = require('express'); 
const router_bssr = Router(); 

const adminController = require("./controllers/adminController");

router_bssr.get('/', adminController.homepage);
router_bssr.post('/login', adminController.loginProcess);
router_bssr.get(
    '/adminpage', 
    adminController.validateAdmin,
    adminController.getAllMembers
);

module.exports = router_bssr;