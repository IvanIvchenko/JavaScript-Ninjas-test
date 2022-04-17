const books = require("../controllers/bookController.js")
const multerModule = require("../config/multerConfig.js")
const uploadNewPicture = multerModule.uploadNew
const uploadEditPicture = multerModule.uploadEdit

var router = require("express").Router();

// Create a New book
router.post("/", uploadNewPicture.single("image"), books.create);

// Retrieve ALL books
router.get("/", books.findAll);

// Retrieve SINGLE book w/ID but without details 
router.get("/:id", books.findOne);

// Update a book w/ID`
//router.put("/:id", books.update);

//Delete a book w/ID
router.delete("/:id", books.delete);

//Delete all books
router.put("/", books.deleteAll);

export default router
