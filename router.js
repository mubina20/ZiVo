const { Router } = require('express'); 
const router = Router(); 

const memberController = require('./controllers/memberController');
const postController = require('./controllers/postController');
const followController = require('./controllers/followController');
const commentController = require('./controllers/commentController');

const uploader_members = require('./utils/upload-multer')("members");
const uploader_posts = require('./utils/upload-multer')("posts");

router.post('/signup', memberController.signupProcess);
router.post('/login', memberController.loginProcess);
router.post('/logout', memberController.logout);

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
router.post(
    "/member-liked",
    memberController.retrieveAuthMember,
    memberController.likeMemberChosen
);

//** POST related routers **//
router.post(
    "/post/create",
    memberController.retrieveAuthMember,
    uploader_posts.array("post_images"),
    postController.createPost
);

//** FOLLOWING related routers **//
router.post(
    "/follow/subscribe",
    memberController.retrieveAuthMember,
    followController.subscribe
);
router.post(
    "/follow/unsubscribe",
    memberController.retrieveAuthMember,
    followController.unsubscribe
);
router.get("/follow/followings", followController.getMemberFollowings);
router.get(
    "/follow/followers",
    memberController.retrieveAuthMember,
    followController.getMemberFollowers
);

//** COMMENT related routers **//
router.post(
    "/comment/createComment",
    memberController.retrieveAuthMember,
    commentController.createComment
);

module.exports = router;