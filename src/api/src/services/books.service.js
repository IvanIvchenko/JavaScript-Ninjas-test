const db = require("../models/index.js")
const setup = require('../config/general.config.js')
const imageFilenameFormatter = require('../utils/imageFilenameFormatter.util.js')
const fs = require('fs');
const Book = db.book;
const BookData = db.bookData

async function create(bookData) {
  const newBook = await Book.create({
    title: bookData.body.title,
    description: bookData.body.description,
    image: setup.url + '/public/' + imageFilenameFormatter(bookData.body.title, bookData.file.mimetype),
    imagePath: '/static/images/' + imageFilenameFormatter(bookData.body.title, bookData.file.mimetype),
    bookData: {
      author: bookData.body.author.toString(),
      year_written: parseInt(bookData.body.year_written),
    }
  },
    { include: [{ model: BookData, as: 'bookData' }] }
  )

  if (newBook) {
    return newBook
  } else {
    const err = new Error('Error occured while creating a book');
    err.statusCode = 500;
    throw err;
  }
}

async function findAll() {
  const books = await Book.findAll()
  if (books) {
    return books
  } else {
    const err = new Error('Error occured while retreaving books');
    err.statusCode = 500;
    throw err;
  }
}

async function findOne(id) {

  const book = await Book.findByPk(id, {
    include: ['bookData']
  })

  if (book) {
    return book
  } else {
    const err = new Error(`No book with id=${id} was found`);
    err.statusCode = 400;
    throw err;
  }
}

async function deleteOne(id) {
  const book = await Book.findByPk(id)
  if (!book) {
    const err = new Error(`No book with id=${id} was found`);
    err.statusCode = 400;
    throw err;
  }
  const bookDataDestr = await BookData.destroy({
    where: { bookDatumId: id }
  })
  const bookDestr = await Book.destroy({
    where: { id: id }
  })
  if (bookDataDestr !== 1 || bookDestr !== 1) {
    const err = new Error(`"Error deleting book with id=${id}`);
    err.statusCode = 409;
    throw err;
  }
  fs.unlink(__dirname + "/../.." + book.imagePath, (err) => {
    if (err) {
      const err = new Error(`"Error deleting image for book with id=${id}`);
      err.statusCode = 500;
      throw err;
    }
  });
  return;
}

async function deleteAll() {
  const folder = __dirname + "/../../static/images/"

  const bookDataDestr = await BookData.destroy({
    where: {},
    truncate: false
  })

  const bookDestr = await Book.destroy({
    where: {},
    truncate: false
  })

  if (!bookDataDestr || !bookDestr) {
    const err = new Error(`"Error deleting books`);
    err.statusCode = 409;
    throw err;
  }

  fs.readdir(folder, (err, files) => {
    if (err) {
      const err = new Error(`"Error finding book images`);
      err.statusCode = 500;
      throw err;
    }

    for (const file of files) {
      fs.unlinkSync(folder + file, (err) => {
        if (err) {
          const err = new Error(`"Error deleting a book image`);
          err.statusCode = 500;
          throw err;
        }
      });
    }
  })
  return;
}

async function update(id, params) {

  let book = await Book.findByPk({ where: { id: id } })
  let bookData = await BookData.findOne({ where: { bookDatumId: id } })

  const updatedBook = await book.save({
    title: params.title || book.title,
    description: params.description || book.description,
    image: !!params.file ?
      setup.url + '/public/' + imageFilenameFormatter(params.body.title, params.file.mimetype)
      : book.image,
    imagePath: !!params.file.lenght ?
      '/static/images/' + imageFilenameFormatter(params.body.title, params.file.mimetype)
      : book.imagePath
  })

  if (!updatedBook) {
    const err = new Error('Error occured while updating a book');
    err.statusCode = 500;
    throw err;
  }

  let updatedBookData = await bookData.save({
    author: params.body.author || bookData.author,
    year_written: params.body.year_written || bookData.year_written,
  })

  if (!updatedBookData) {
    const err = new Error('Error occured while updating a book data');
    err.statusCode = 500;
    throw err;
  }

  return { ...updatedBook, bookData: { ...updatedBookData } }
}

module.exports = {
  create,
  update,
  findAll,
  findOne,
  deleteOne,
  deleteAll,
}