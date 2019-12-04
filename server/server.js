// server.js
const express = require('express');
const bodyParser = require('body-parser');
let port = 1234;
const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));
//app.use(cors());

// Set up a mongoose connection
const mongoose = require('mongoose');

let dev_db_url = 'mongodb+srv://admin:123@cluster0-ftey1.mongodb.net/test?retryWrites=true&w=majority';
console.log(dev_db_url);
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.once("open", ()=> console.log("connected"));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/song", require("./routes/songs.route.js"));
app.use("/review", require("./routes/review.route.js"));
app.use("/user", require("./routes/users.route.js"));
app.use("/token", require("./routes/tokens.route.js"));

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
