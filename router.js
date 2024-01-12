const { Router } = require('express'); 
const router = Router(); 

const memberController = require('./controllers/memberController');
const uploader_members = require('./utils/upload-multer')("members");

router.post('/signup', uploader_members.single('member_image'), memberController.signupProcess);
router.post('/login', memberController.loginProcess);

module.exports = router;