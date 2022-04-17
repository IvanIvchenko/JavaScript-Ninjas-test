const multer = require("multer")
const newBookExistsCheck = require("../bin/newBookExistsCheck.js")

// defining image storage location
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./static/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.title.split(" ").join("_") + "." + file.mimetype.split("/").at(-1));
    }
});
// defining imagesave filters for book creation
const fileFilterCreate = (req, file, cb) => {
    newBookExistsCheck(req.body.title)
        .then(check => {
            if (!check
                && file.mimetype === "image/png"
                || file.mimetype === "image/jpg"
                || file.mimetype === "image/jpeg"
            ) {
                cb(null, true);
            }
            else {
                cb(null, false);
            }
        })
}
// defining imagesave filters for book edit
const fileFilterEdit = (req, file, cb) => {
    if (file.mimetype === "image/png"
        || file.mimetype === "image/jpg"
        || file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

module.exports = {
    uploadNew: multer({ storage: storageConfig, fileFilter: fileFilterCreate }),
    uploadEdit: multer({ storage: storageConfig, fileFilter: fileFilterEdit })
}