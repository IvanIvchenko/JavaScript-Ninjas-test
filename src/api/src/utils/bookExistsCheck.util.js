const db = require("../models/index.js")
const Book = db.book;

module.exports = async (title) => {
    const book = await Book.findAll({where:{title:title}})
    return !!book.length
}