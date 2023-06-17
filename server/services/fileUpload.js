// This is horribly bad design pattern. Not DI, not Interface
// My comment of shame

const { BASE_URL, PORT } = require('../configs');
const Card = require('../models/card');
const File = require('../models/file');


const uploadFile = async (fileData, cardId, owner) => {

    console.log(fileData);

    let sampleFile;
    let uploadPath;

    let file = new File({
        owner: owner,
        name: fileData.name
    });

    let objId = file._id;


    let URL = `http://${BASE_URL}:${PORT}/api/files/${objId}`;
    file.URL = URL;

    try {
        await file.save();
    } catch (error) {
        console.log(error);
        return "NOT OK";
    }

    // Update card files
    try {
        const card = await Card.findById(cardId);
        card.files.push(file._id);
        await card.save();
    } catch (err) {
        console.log(err);
    }

    //The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    uploadPath = './files/' + fileData.name;

    // Use the mv() method to place the file somewhere on your server
    fileData.mv(uploadPath, function (err) {
        if (err)
            return err;

        return objId;
    });


}


const getFile = async (fileID, user) => {
    let message = {
        status: 200,
        text: "OK",
        path: ""
    };
    const file = await File.findOne({ _id: fileID });
    if (!file) {
        message.status = 404;
        message.text = "NOT FOUND";
        return message;
    }
    // Authorization 
    //console.log(file.owner.toString() == user._id.toString());
    //console.log(user._id);
    // if (file.owner.toString() != user._id.toString()) {
    //     message.status = 403;
    //     message.text = "FORBIDDEN";
    //     return message;
    // }
    message.status = 200;
    message.text = "SUCCESS";
    message.path = './files/' + file.name;
    return message;
}

module.exports = { uploadFile, getFile }