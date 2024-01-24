const { Router } = require('express'); 
const router = Router(); 

const memberController = require('./controllers/memberController');
const uploader_members = require('./utils/upload-multer')("members");

router.post('/signup', memberController.signupProcess);
router.post('/login', memberController.loginProcess);

//** MEMBER related routers **//
router.get(
    "/member/:id", 
    memberController.retrieveAuthMember,
    memberController.getChosenMember
);
router.get(
    '/members', 
    memberController.getAllMembers
);

module.exports = router;