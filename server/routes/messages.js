const express = require('express');
const router = express.Router();
const { messagesController } = require('../controlles/messagesController');
const middleware = require('../passport/middleware');

router.get('/', function(req, res, next) {
    messagesController.getMessages(req, res)
});

router.post('/private', middleware.checkToken, (req, res) => messagesController.getPrivateMessages(req, res));
// router.post('/saveprivate', middleware.checkToken, (req, res) => messagesController.newPrivateMessage(req, res));


module.exports = router;