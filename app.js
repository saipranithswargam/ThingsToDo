const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userPage");
const IndexRoute = require("./routes/index");
const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();
const store = new MongoDBStore({
    uri: process.env.DB_URI,
    collection: "session",
});
mongoose.set("strictQuery", true);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log(err));
});
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    next();
});
app.use(IndexRoute);
app.use(authRoutes);
app.use(userRoutes);

app.use(errorController.get404);

const port = 3000 || process.env.PORT;
mongoose
    .connect(process.env.DB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then((result) => {
        console.log("connected to database");
        app.listen(port, () => {
            console.log("runing on port 3000");
        });
    })
    .catch((err) => {
        console.log(err);
    });
//redirection to login page once known user is found is pending