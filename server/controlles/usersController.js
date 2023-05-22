const { userService } = require('../services/userService');
const { messagesService } = require('../services/messagesService');

class UsersController {

    constructor() {}

    users(req, res) {
        userService.users((err, data) => {
            if (err) res.status(400).json({ reason: err })
            else res.json(data);
        });
    }
    newUser(req, res) {
        userService.newUser(req.body.user, (err, data) => {
            if (err) {
                res.status(400).json({ reason: err });
            }
            else res.json(data);
        });
    }
    updateUser(req, res) {
        userService.updateUser(req.body.user, (err, data) => {
            if (err) 
             res.status(400).json({ reason: err })
            else {
                messagesService.updateMessagePhotos(req.body.user,(err,data1)=>{
                    if (err) res.status(400).json({ reason: err })
                    else res.json(data1);
                })
            }
        });
    }

    deleteUser(req,res){
        userService.deleteUser(req.body.user,(err,data)=>{
            if(err) res.status(400).json({reason:err})
            else res.json(data);
        })
    }

    getMessages(req, res) {
        userService.getMessages((err, data) => {
            if (err) res.status(400).json({ reason: err })
            else res.json(data);
        });
    }

    newMessage(req, res) {
        userService.newMessage(req.body.message, (err, data) => {
            if (err) res.status(400).json({ reason: err })
            else res.json(data);
        });
    }

    deleteMessages(req, res) {
        userService.deleteMessages(req.body.name, (err, data) => {
            if (err) res.status(400).json({ reason: err })
            else res.json(data);
        });
    }

}

module.exports = {
    usersController: new UsersController()
}