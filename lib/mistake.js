class Definer {
    // GENERAL errors
    static general_error1 = "Something went wrong!";    
    static general_error2 = "There is no data with that params!";

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
    static comment_error2 = "There was an error editing comment!";
}

module.exports = Definer;