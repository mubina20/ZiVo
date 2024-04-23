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
    memberController.retrieveAuthMember,
    memberController.getAllMembers
);
router.post(
    "/member-liked",
    memberController.retrieveAuthMember,
    memberController.likeMemberChosen
);
router.get(
    "/my-liked-posts",
    memberController.retrieveAuthMember,
    memberController.findMyLikedPosts
)
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
    uploader_photo.single("post_content"),
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
    "/post/:type/:id",
    memberController.retrieveAuthMember,
    postController.getChosenPost
)
router.get(
    "/post/photo/:id", 
    memberController.retrieveAuthMember,
    postController.getChosenPhotosPost
);
router.get(
    "/post/article/:id", 
    memberController.retrieveAuthMember,
    postController.getChosenArticlePost
);
router.get(
    "/post/video/:id", 
    memberController.retrieveAuthMember,
    postController.getChosenVideoPost
);
router.post(
    "/post/status", 
    memberController.retrieveAuthMember,
    postController.statusPost
);
router.get(
    "/post/all-posts",
    memberController.retrieveAuthMember,
    postController.getAllPosts
);
router.post(
    "/post/all-videoPosts",
    memberController.retrieveAuthMember,
    postController.getAllVideoPosts
);
router.post(
    "/post/all-articlePosts",
    memberController.retrieveAuthMember,
    postController.getAllArticlePosts
);
router.post(
    "/post/all-photoPosts",
    memberController.retrieveAuthMember,
    postController.getAllPhotoPosts
);
router.post(
    "/post/edit",
    memberController.retrieveAuthMember,
    postController.editPost
);
router.post(
    "/post/saved",
    memberController.retrieveAuthMember,
    postController.savedPost
);
router.get(
    "/post/all-savedPosts",
    memberController.retrieveAuthMember,
    postController.getAllSavedPosts
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
router.get(
    "/follow/:follow_id",
    memberController.retrieveAuthMember,
    followController.chosenMemberFollow
);

//** COMMENT related routers **//
router.post(
    "/comment/createComment",
    memberController.retrieveAuthMember,
    commentController.createComment
);
router.post(
    "/comment/chosenPostComments",
    memberController.retrieveAuthMember,
    commentController.findChosenPostAllComments
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
    chatController.findMyChats
);
router.get(
    "/chat/find/:receiver_id", 
    memberController.retrieveAuthMember, 
    chatController.getSelectedChat
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