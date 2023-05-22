const { messagesService } = require('../services/messagesService');


class MessagesController {

    constructor() { }

    newMessage(message) {
        messagesService.newMessage(message, (err, data) => {
            if (err) console.log({ reason: err })
            else console.log(data);
        });
    }

    newPrivateMessage(message) {
        message = {
            to:{
                email: message.to.email,
                phone: message.to.phone,
                name: message.to.name,
                lname: message.to.lname,
                photo: message.to.photo,
                role: message.to.role,
            },
            from:{
                email: message.from.email,
                phone: message.from.phone,
                name: message.from.name,
                lname: message.from.lname,
                photo: message.from.photo,
                role: message.from.role,
            },
            message:message.message,
            time:message.time,
        }
        console.log('message2Save: ', message);
        messagesService.newPrivateMessage(message, (err, data) => {
            if (err) console.log({ reason: err })
            // else console.log(data);
        })
    }

    getMessages(req, res) {
        messagesService.getMessages((err, data) => {
            if (err) {
                console.log('controller error: ', err)
                res.status(400).json({ reason: err });
            }
            else {
                console.log('controller data: ', data)
                res.json(data);
            }
        });
    }

    getPrivateMessages(req, res) {
        // console.log('req.body.selectedUser: ', req.body.to);
        // console.log('req.body.user: ', req.body.from);

        let users = {
            to: req.body.to,
            from: req.body.from,
        };
        // console.log('users',users)
        messagesService.getPrivateMessages(users, (err, data) => {
            if (err) {
                console.log('controller error: ', err)
                res.status(400).json({ reason: err });
            }
            else {
                // console.log('controller data: ', data);
                res.json(data);
            }
        });
    }

}

module.exports = {
    messagesController: new MessagesController()
}