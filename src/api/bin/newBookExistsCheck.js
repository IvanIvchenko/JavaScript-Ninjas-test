const db = require("../models/index.js")
const Book = db.book;

module.exports = async (title) => {
    let check
    await Book.findAll({where:{title:title}})
    .then(book => {
        return check = (!!book.length) 
    })
    return check
}