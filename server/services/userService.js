const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

class UserService {
    constructor() {
        this.UsersSchema = new Schema({
            name: String,
            lname: String,
            role: {
                type: String,
                default: 'student',
                enum: ['student', 'teacher', 'admin']
            },
            phone: {
                type: String,
                unique: true,
            },
            email: {
                type: String,
                required: 'Require e-mail',
                unique: true,
            },
            photo: String,
            password: String,
            city: String,
            country: String,
            age: Date,
            about: String,
            zip: String,
            street: String,

        });

        this.TeacherSchema = new Schema({
            companyName: {
                type: String,
                required: true,
            },
            department: String,
            user: {
                type: Schema.Types.ObjectId,
                ref: 'Users1',
            }
        });

        // this.MessagesSchema = new Schema({
        //     user: String,
        //     mess: String,
        //     time: Date,
        // });
        this.onlineUserSchema = new Schema({
            name: String,
            lname: String,
            role: {
                type: String,
                default: 'student',
                enum: ['student', 'teacher', 'admin']
            },
            phone: {
                type: String,
                unique: true,
            },
            email: {
                type: String,
                required: 'Require e-mail',
                unique: true,
            },
            photo: String,
            password: String,
        });

        //connect shema to DB in mongo
        mongoose.model('Users1', this.UsersSchema);
        this.Users = mongoose.model('Users1');
        mongoose.model('Companies', this.TeacherSchema);
        this.Teachers = mongoose.model('Companies');
        // mongoose.model('Messages', this.MessagesSchema);
        // this.Messages = mongoose.model('Messages');
    }

    // getMessages(callback) {
    //     this.Messages.find((err, message) => {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, message);
    //         }
    //     })
    // }

    // newMessage(message, callback) {
    //     console.log('New Message :', message);
    //     const finalMessage = new this.Messages({
    //         'user': message.user,
    //         'mess': message.mess,
    //         'time': message.time
    //     });
    //     finalMessage.save()
    //         .then((message) => {
    //             callback(null, message);
    //         })
    //         .catch((err) => {
    //             callback(err, null)
    //         });
    // }

    // deleteMessages(username, callback) {
    //     this.Messages.deleteMany({ user: username }, (err, message) => {
    //         if (err) {
    //             callback(err, null);
    //         } else {
    //             callback(null, message);
    //         }
    //     })
    // }

    users(callback) {
        this.Users.find((err, usr) => {
            if (err) {
                console.log('err: ', err)
                callback(err, null);
            } else {
                console.log('users: ', usr);
                callback(null, usr);
            }
        })
    }

    findUser(username, callback) {
        this.Users.findOne({ email: username }, (err, usr) => {
            if (usr) {
                console.log('usr: ', usr);
                callback(null, usr);
            } else {
                console.log('err: ', err);
                callback(err, null);
            }
        })
    }

    newUser(user, callback) {
        console.log('New User :', user);
        let password = bcrypt.hashSync(user.password, 10);
        const finalUser = new this.Users({
            'name': user.fname,
            'lname': user.lname,
            'role': user.role,
            'phone': user.phone,
            'email': user.email,
            'photo': user.photo,
            'password': password,
            'city': user.city,
            'country': user.country,
        });
        console.log('finalUser: ', finalUser);
        finalUser.save()
            .then((usr) => {
                if (user.role === 'teacher') {
                    const Teacher = new this.Teachers({
                        companyName: user.company,
                        department: user.department,
                        user: usr._id,
                    });
                    Teacher.save();
                }
                callback(null, usr);
            })
            .catch((err) => {
                console.log('err service: ', err)
                callback(err, null)
            });
    }

    updateUser(user, callback) {
        this.Users.updateOne({
            'email': user.email
        }, {
            'name': user.name,
            'lname': user.lname,
            'role': user.role,
            'phone': user.phone,
            'email': user.email,
            'photo': user.photo,
            'country': user.country,
            'about': user.about,
            'zip': user.zip,
            'age': user.age,
            'street': user.street,
            'city': user.city,
        },
            (err, usr) => {
                if (err) {
                    console.log('error', err);
                    callback(err, null)
                } else callback(null, user);
            }
        );
    }

    deleteUser(user, callback) {
        this.Users.findOneAndDelete({ email: user.email, phone: user.phone }, (err, usr) => {
            if (err) {
                callback(err, null);
            } else {
                console.log('usr: ', usr);
                callback(null, usr);
            }
        })
    }

}

module.exports = {
    userService: new UserService()
}