const bookExistsCheck = require("../utils/bookExistsCheck.util.js")

module.exports = async (req, res, next) => {
    try {
        if (!req.body.title
            || !req.body.description
            || !req.file
            || !req.body.author
            || !req.body.year_written
        ) {
            const err = new Error('Book data is incomplete');
            err.statusCode = 400;
            throw err;
        } else {
            const bookExists = await bookExistsCheck(req.body.title)
            if (bookExists) {
                const err = new Error('Book with the same title already exists');
                err.statusCode = 409;
                throw err;
            }
        }
        next()
    } catch (error) {
        if (!error.statusCode) error.statusCode = 500;
        next(error);
    }
}