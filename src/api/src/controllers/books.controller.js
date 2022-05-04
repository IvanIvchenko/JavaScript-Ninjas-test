const books = require('../services/books.service');

exports.create = async (req, res, next) => {
  try {
    res.status(200).json(await books.create(req));
  } catch (err) {
    console.error(`Error while creating book:`, err.message);
    next(err);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    res.status(200).json(await books.findAll());
  } catch (err) {
    console.error(`Error while retreaving books:`, err.message);
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    res.status(200).json(await books.findOne(req.params.id));
  } catch (err) {
    console.error(`Error while retreaving a book:`, err.message);
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    res.status(200).json(await books.update(req.params.id, req));
  } catch (err) {
    console.error(`Error while updating a book:`, err.message);
    next(err);
  }
}

exports.delete = async(req, res, next) => {
  try{
    res.status(204).json(await books.deleteOne(req.params.id))
  } catch (err) {
    console.error(`Error while deleting book with id=${req.params.id}:`, err.message);
    next(err);
  }
}

exports.deleteAll = async(req, res, next) => {
  try{
    res.status(204).json(await books.deleteAll())
  } catch (err) {
    console.error(`Error while deleting books:`, err.message);
    next(err);
  }
}


