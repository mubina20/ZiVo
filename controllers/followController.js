const assert = require('assert');
const Definer = require('../lib/mistake');
const Follow = require('../models/Follow');

let followController = module.exports;

followController.subscribe = async (req, res) => {
    try{
        console.log("POST: User Subscribed! (subscribe)");

        assert.ok(req.member, Definer.authentication_error5);

        const follow = new Follow();
        const result = await follow.subscribeData(req.member, req.body);

        res.json({state: 'success', data: result});
    } catch(err) {
        console.log(`ERROR: Subscribe!, ${err.message}`); 
        res.json({state: 'fail', message: "There was an error while Subscribing!"});
    }
};

followController.unsubscribe = async (req, res) => {
    try{
        console.log("POST: User Subscribed! (unsubscribe)");

        assert.ok(req.member, Definer.auth_err5);

        const follow = new Follow();
        const result = await follow.unsubscribeData(req.member, req.body);

        res.json({state: "success", data: result});
    } catch(err) {
        console.log(`ERROR: Unsubscribe!, ${err.message}`);
        res.json({state: 'fail', data: "There was an error while UnSubscribing!"});
    }
};

followController.getMemberFollowings = async (req, res) => {
    try{
        console.log("GET: User is viewing Followings!");

        const follow = new Follow();
        const result = await follow.getMemberFollowingsData(req.query);

        res.json({state: "success", data: result})
    } catch(err) {
        console.log(`ERROR: getMemberFollowings! ${err.message}`);
        res.json({state: "fail", message: "There was an error viewing the Followings!"})
    }
};

followController.getMemberFollowers = async (req, res) => {
    try {
        console.log("GET: User is viewing Followers!");
        
        const follow = new Follow();
        const result = await follow.getMemberFollowersData(req.member, req.query);
    
        res.json({ state: "success", data: result });
    } catch (err) {
        console.log(`ERROR: getMemberFollowers, ${err.message}`);
        res.json({ state: "fail", message: "There was an error viewing the Followers!" });
    }
};