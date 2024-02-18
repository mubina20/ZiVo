const { Router } = require('express'); 
const router = Router(); 

const memberController = require('./controllers/memberController');
const postController = require('./controllers/postController');
const followController = require('./controllers/followController');
const commentController = require('./controllers/commentController');
const chatController = require('./controllers/chatController');
const messageController = require('./controllers/messageController');

const uploader_members = require('./utils/upload-multer')("members");
const uploader_photo = require('./utils/upload-multer')("photos");
const uploader_video = require('./utils/upload-multer')("videos");

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
router.post(
	'/member/update',
	memberController.retrieveAuthMember,
	uploader_members.single('mb_profile_image'),
	memberController.updateMember,
);

//** POST related routers **//
router.post(
    "/post/create/photo",
    memberController.retrieveAuthMember,
    uploader_photo.array("post_content", 10),
    postController.createPhotoPost
);
router.post(
    "/post/create/article",
    memberController.retrieveAuthMember,
    postController.createArticlePost
);
router.post(
    "/post/create/video",
    memberController.retrieveAuthMember,
    uploader_video.single("post_content"),
    postController.createVideoPost
);
router.get(
    "/post/:id", 
    memberController.retrieveAuthMember,
    postController.getChosenPost
);
router.post(
    "/post/status", 
    memberController.retrieveAuthMember,
    postController.statusPost
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

//** Chat related routers **//
router.post(
    "/chat/create",
    memberController.retrieveAuthMember,
    chatController.createChat
);
router.get(
    "/chat", 
    memberController.retrieveAuthMember, 
    chatController.findUserChats
);
router.get(
    "/chat/find/:receiver_id", 
    memberController.retrieveAuthMember, 
    chatController.findChat
);

//** Message related routers **//
router.post(
    "/chat/message",
    memberController.retrieveAuthMember,
    messageController.createMessaage
);
router.get(
    "/chat/:chat_id", 
    memberController.retrieveAuthMember, 
    messageController.getMessages
);
router.post(
    "/chat/message/reaction",
    memberController.retrieveAuthMember,
    messageController.reactionMessage
);
router.post(
    "/chat/message/edit",
    memberController.retrieveAuthMember,
    messageController.editMessage
);
router.post(
    "/chat/message/delete",
    memberController.retrieveAuthMember,
    messageController.deleteMessage
);

module.exports = router;