const multer = require("multer")
const bookExistsCheck = require("../utils/bookExistsCheck.util.js")

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
const fileFilterCreate = async (req, file, cb) => {
    if (!req.body.title
        || !req.body.description
        || !req.body.author
        || !req.body.year_written
        || !file
    ) {
        cb(null, false);
    } else {
        const bookExists = await bookExistsCheck(req.body.title)
        if (!bookExists
            && file.mimetype === "image/png"
            || file.mimetype === "image/jpg"
            || file.mimetype === "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
}
// defining imagesave filters for book edit
const fileFilterEdit = (req, file, cb) => {
    if (file.mimetype === "image/png"
        || file.mimetype === "image/jpg"
        || file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = {
    uploadNew: multer({ storage: storageConfig, fileFilter: fileFilterCreate }),
    uploadEdit: multer({ storage: storageConfig, fileFilter: fileFilterEdit })
}