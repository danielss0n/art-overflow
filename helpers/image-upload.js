const multer = require("multer");
const path = require("path");

// Destination to store image
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "posts";

        cb(null, `public/images/${folder}/`);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.replace(/\s/g, ''));
    },
});



const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error("Por favor, envie apenas png ou jpg!"));
        }
        cb(undefined, true);
    },
});



module.exports = { imageUpload };