const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');


class MessagesService {
    constructor() {
        this.MessagesSchema = new Schema({
            user: String,
            message: String,
            time: Date,
            email: String,
            photo: String,
        });
        this.PrivateMessagesSchema = new Schema({
            from: Object,
            to: Object,
            message: String,
            time: Date,
        });
        mongoose.model('PrivateMessages', this.PrivateMessagesSchema);
        this.PrivateMessages = mongoose.model('PrivateMessages');
        mongoose.model('Messages', this.MessagesSchema);
        this.Messages = mongoose.model('Messages');
    }

    newMessage(message, callback) {
        console.log('New Message :', message);
        const finalMessage = new this.Messages({
            'user': message.user,
            'message': message.message,
            'time': message.time,
            'email': message.email,
            'photo': message.photo,
        });
        finalMessage.save()
            .then((message) => {
                callback(null, message);
            })
            .catch((err) => {
                callback(err, null)
            });
    }
    newPrivateMessage(message, callback) {
        const finalMessage = new this.PrivateMessages({
            'from': message.from,
            'to': message.to,
            'message': message.message,
            'time': message.time,
        });
        finalMessage.save()
            .then((message) => {
                callback(null, message);
            })
            .catch((err) => {
                callback(err, null)
            });
    }

    getMessages(callback) {
        this.Messages.find((err, messages) => {
            if (err) {
                console.log('Service messages: ', messages);
                callback(err, null);
            } else {
                console.log('Service messages: ', messages);
                callback(null, messages);
            }
        })
    }

    getPrivateMessages(users, callback) {
        let messages2Send = [];

        this.PrivateMessages.find({
            'to': users.to,
            'from': users.from,
        }, (err, firstMessages) => {
            if (firstMessages) {
                for (let i = 0; i < firstMessages.length; i++) {
                    messages2Send.push(firstMessages[i]);
                }
                this.PrivateMessages.find({
                    'to': users.from,
                    'from': users.to,
                }, (err, secondMessages) => {
                    if (secondMessages) {
                        for (let i = 0; i < secondMessages.length; i++) {
                            messages2Send.push(secondMessages[i]);
                        }
                        callback(null, messages2Send);
                    } else {
                        console.log('err: ', err);
                        callback(err, null);
                    }
                })
            } else {
                console.log('err: ', err);
                callback(err, null);
            }
        })
    }

    updateMessagePhotos(user, callback) {
        this.Messages.updateMany(
            {
                'email': user.email
            },
            {
                'photo': user.photo,
            },
            (err, messages) => {
                if (err) {
                    console.log('error', err);
                    callback(err, null)
                } else callback(null, messages);
            })
    }


}


module.exports = {
    messagesService: new MessagesService()
}