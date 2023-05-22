const fs = require('fs');
const path = require('path');
const PUBLIC_PATH = '../public/images/'

class FileController {

    constructor() {}

    saveFiles(req,res){
        let filepath = path.join(__dirname, PUBLIC_PATH, req.body.name);
        let file_data = req.body.blob.substr(req.body.blob.indexOf('base64') + 7);
        fs.writeFile(filepath, file_data, {encoding:'base64'}, (error,data)=> {
            if (error) res.status(400).json({reason:'Error in database'})
            else res.json(data);
        })
    }
}

module.exports = {
    fileController: new FileController()
}