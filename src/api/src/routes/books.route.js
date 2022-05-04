const books = require("../controllers/books.controller.js")
const bookValidator = require("../middleware/bookValidator.middleware.js")
const errorHandler = require("../middleware/errorHandler.middleware.js")
const multerModule = require("../middleware/multer.middleware.js")
const uploadNewPicture = multerModule.uploadNew
const uploadEditPicture = multerModule.uploadEdit

var router = require("express").Router();

// Create a New book
router.post("/", uploadNewPicture.single("image"), bookValidator, books.create, errorHandler);

// Retrieve ALL books
router.get("/", books.findAll, errorHandler);

// Retrieve SINGLE book w/ID but without details 
router.get("/:id", books.findOne, errorHandler);

//Update a book w/ID
router.put("/:id", uploadEditPicture.single("image"), books.update, errorHandler);

//Delete a book w/ID
router.delete("/:id", books.delete, errorHandler);

//Delete all books
router.delete("/", books.deleteAll, errorHandler);

export default router
