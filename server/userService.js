const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const fs = require("fs");
const LOCAL = 'public';
const path = require('path');


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
            phone: String,
            email: {
                type: String,
                required: 'Require e-mail',
                unique: true,
            },
            password: String,
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
        //connect shema to DB in mongo
        mongoose.model('Users1', this.UsersSchema);
        this.Users = mongoose.model('Users1');
        mongoose.model('Companies', this.TeacherSchema);
        this.Teachers = mongoose.model('Companies');
    }

    socket(req,res) {
        let filename = path.join(__dirname,'../public/main.html');
        fs.stat(filename, (err, stat) => {
            if (err) {
                res.writeHead(404)
                res.end('no such file or directory');
            } else {
                let file = fs.createReadStream(filename);
                file.pipe(res);
            }
        });
    }

    main(path, callback)  {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                callback(err, null);
            } else {
            callback(null, data);
            }
        })
    }

    users(callback) {
        this.Users.find((err, usr) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, usr);
            }
        })
    }

    newUser(user, callback) {
        console.log('New User :', user);
        let password = bcrypt.hashSync(user.phone, 10);
        const finalUser = new this.Users({
            'name': user.name,
            'lname': user.lname,
            'role': user.role,
            'phone': user.phone,
            'email': user.email,
            'password': password,
        });
        finalUser.save()
            .then((usr) => {
                if (user.role === 'teacher') {
                    const Teacher = new this.Teachers({
                        companyName: user.company,
                        department: user.department,
                        user: usr._id,
                    });
                    Teacher.save();
                    callback(null, usr);
                } callback(null, usr);
            })
            .catch((err) => {
                callback(err, null)
            });
    }

    updateUser = (user, callback) => {
        this.Users.updateOne({
                'email': user.email
            }, {
                'name': user.name,
                'lname': user.lname,
                'role': user.role,
                'phone': user.phone,
                'email': user.email
            },
            (err, usr) => {
                if (err) {
                    console.log('error', err);
                    callback(err, null)
                } else callback(null, usr);
            }
        );
    }

}

module.exports = {
    userService: new UserService()
}