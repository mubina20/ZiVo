const { Router } = require('express'); 
const router = Router(); 

const memberController = require('./controllers/memberController');

router.post('/signup', memberController.signupProcess);
router.post('/login', memberController.loginProcess);

module.exports = router;