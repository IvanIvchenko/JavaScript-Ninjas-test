const db = require("../models/index.js")
const fs = require('fs');
const newBookExistsCheck = require("../bin/newBookExistsCheck.js")
const Book = db.book;
const BookData = db.bookData
const Op = db.Sequelize.Op

const url = 'http://localhost:5000'

exports.create = (req, res) => {
  // Validate request
  newBookExistsCheck(req.body.title)
    .then(check => {
      if (check) {
        return res.status(409).send({
          error: "Book with same title already exists"
        })
      } else if (!req.body.title
        || !req.body.description
        || !req.file
        || !req.body.author
        || !req.body.year_written
      ) {
        return res.status(400).send({
          error: "Book data is incomplete!"
        });
      }
    })
    .then(() => {
      if(res.writableEnded){
        return;
      }
      // Create and save book in the database
      Book.create({
        title: req.body.title,
        description: req.body.description,
        image: url + '/public/' + req.body.title.split(" ").join("_") + "." + req.file.mimetype.split("/").at(-1),
        imagePath: '/static/images/' + req.body.title.split(" ").join("_") + "." + req.file.mimetype.split("/").at(-1),
        bookData: {
          author: req.body.author.toString(),
          year_written: parseInt(req.body.year_written),
        }
      },
        { include: [{ model: BookData, as: 'bookData' }] }
      )
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            error:
              err.message || "Some error occurred while creating a book."
          });
        })
    })
};

exports.findAll = (req, res) => {

  Book.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        error:
          err.message || "Some error occurred while retrieving books."
      });
    });
};

exports.findOne = (req, res) => {

  const id = req.params.id;

  Book.findByPk(id, {
    include: ['bookData']
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          error: `Cannot find Book with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        error: err || "Error retrieving Book with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Book.finbByPk(id, { include: [{ model: BookData, as: 'bookData' }] })
  .then(book =>{
    book.title = req.body.title || book.title
    book.description = req.body.description || book.description
    book.image = !!req.file.lenght ? 
    url + '/public/' + req.body.title.split(" ").join("_") + "." + req.file.mimetype.split("/").at(-1)
    : book.image
    book.imagePath = !!req.file.lenght ?
    '/static/images/' + req.body.title.split(" ").join("_") + "." + req.file.mimetype.split("/").at(-1)
    : book.imagePath
    book.bookData.author = req.body.author || book.bookData.author
    book.bookData.year_written = req.body.year_written || book.bookData.year_written
    book.save()
    res.send(book)
  })
    .catch(err => {
      res.status(500).send({
        error: err || "Error updating Tutorial with id=" + id
      });
    });
};

exports.delete = (req, res) => {

  const id = req.params.id;

  Book.findByPk(id)
    .then(book => {
      fs.unlink(__dirname + "/.." + book.imagePath, (err) => {
        if (err) {
          console.log({
            error: err || "Error deleting image for book with id=" + id
          });
        }
      });
    })

  BookData.destroy({
    where: { bookDatumId: id }
  })
    .then(() => {
      Book.destroy({
        where: { id: id }
      })
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Book was deleted successfully!"
        });
      } else {
        res.status(500).send({
          error: `Cannot delete book with id=${id}. Maybe book was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        error: err || "Could not delete book with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {

  const folder = __dirname + "/../static/images/"

  fs.readdir(folder, (err, files) => {
    if (err){console.log(err)};

    for (const file of files) {
      fs.unlinkSync(folder + file);
    }
  })

  BookData.destroy({
    where: {},
    truncate: false
  })
    .then(() =>
      Book.destroy({
        where: {},
        truncate: false
      }))
    .then(nums => {
      res.send({ message: `${nums} Books were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        error:
          err.message || "Some error occurred while removing all books."
      });
    });
};

