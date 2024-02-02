const { Router } = require('express'); 
const router = Router(); 

const memberController = require('./controllers/memberController');
const postController = require('./controllers/postController');

const uploader_members = require('./utils/upload-multer')("members");
const uploader_posts = require('./utils/upload-multer')("posts");

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

// POST
router.post(
    "/post/create",
    memberController.retrieveAuthMember,
    uploader_posts.array("post_images"),
    postController.createPost
)

module.exports = router;