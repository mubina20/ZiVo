class Definer {
    // GENERAL errors
    static general_error1 = "Something went wrong!";    
    static general_error2 = "There is no data with that params!";
    static general_error3 = "file upload arror!";
    
    // MEMBER AUTHENTICATION related Errors
    static authentication_error1 = "MongoDB Error!";
    static authentication_error2 = "Error creating JWT!";
    static authentication_error3 = "No member with that nickname!";
    static authentication_error4 = "Your credentials do not match!";
    static authentication_error5 = "You are not authenticated!";

    // FOLLOW related Errors
    static follow_error1 = "Self subscription is denied!";
    static follow_error2 = "New follow subscription is failed!";
    static follow_error3 = "No follow data found!";

    // COMMENT related Errors
    static comment_error1 = "There was an error commenting!";

    // POST related Errors
    static post_error1 = "There was an error saved the Post!";
    static post_error2 = "There was an error creating the photos post!";
    static post_error3 = "There was an error creating the artile post!!";
    static post_error4 = "There was an error creating the video post!";
    static post_error5 = "There was an error finding all posts!";
    static post_error6 = "There was an error finding all video posts!";
    static post_error7 = "There was an error finding all article posts!";
    static post_error8 = "There was an error finding all photo posts!";

    // MongoDB related errors
    static mongo_validation_err1 = "MongoDB validation is failed!";

    // CHAT related Errors
    static chat_error1 = "There was an error creating the chat!";
    static chat_error2 = "There was an error finding the chats!";
    static chat_error3 = "There was an error finding the chat!";

    // MESSAGE related Errors
    static message_error1 = "There was an error sending the message!";
    static message_error2 = "There was an error finding the messages!";
    static message_error3 = "There was an error reacting to message!";
    static message_error4 = "There was an error editing to message!";
    static message_error5 = "There was an error deleted to message!";
}

module.exports = Definer;