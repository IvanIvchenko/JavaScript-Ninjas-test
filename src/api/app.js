import express from 'express'
import cors from 'cors'
import booksRoute from './routes/booksRoute.js'

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
//     res.setHeader('Access-Control-Allow-Credentials', true)
//     next()
// });
const db = require("./models");

// db.sequelize.sync();
db.sequelize.sync({ force: true })

app.use("/public", express.static(__dirname + "/static/images"));

app.use("/books", booksRoute);

app.listen(5000, () => console.log("Express server started at localhost:5000"));