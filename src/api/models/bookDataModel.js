module.exports = (sequelize, Sequelize) => {
    const BookData = sequelize.define("bookData", {
        author: {
            type: Sequelize.STRING
        },
        year_written: {
            type: Sequelize.INTEGER
        }
    });
    return BookData;
};