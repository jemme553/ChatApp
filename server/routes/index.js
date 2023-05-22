var express = require('express');
var router = express.Router();
const passport = require('../passport/passport');
const middleware = require('../passport/middleware');
const { usersController } = require('../controlles/usersController');
const { fileController } = require('../controlles/filecontroller');
const { userService } = require('../services/userService');
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let config = require('../passport/config');


const path = require('path');
/* GET home page. */

router.get('/test', function (req, res, next) {
  res.sendFile('../public/users.html');
});


/* LOGIN */
router.post('/login', function (req, res, next) {
  console.log('req.body: ', req.body);
  console.log('req.body.email: ', req.body.email);
  userService.findUser(req.body.email, (err, result) => {
    if (result) {
      console.log('result: ', result);

      if (!bcrypt.compareSync(req.body.password, result.password)) {
        console.log('Error: Incorrect password');
        res.status(401).send('Incorrect password');
      } else {
        // //BUILD OUR TOKEN
        let token = {
          username: result.email,
          role: result.role
        }
        let newToken = jwt.sign(token, config.secret);
        let user = {
          user: result,
          token: newToken
        }
        res.json(user);
      }

    } else {
      console.log('err: ', err);
      res.status(401).send('Not Authorized');
    }
  });
})

router.get('/err', (req, res) => { res.status(401).send('Not autorized') });
// router.get('/messages', (req, res) => usersController.getMessages(req, res));
router.post('/newmessage', middleware.checkToken, (req, res) => usersController.newMessage(req, res));
router.post('/deletemessages', middleware.isAdmin, middleware.checkToken, (req, res) => usersController.deleteMessages(req, res));
router.post('/files', (req, res) => fileController.saveFiles(req, res));


module.exports = router;