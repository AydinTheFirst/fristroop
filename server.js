import express from "express";
import passport from "passport";

// Local Imports
import { config } from "./config.js";
import { router } from "./routers/router.js";
import session from "express-session";
import { upload } from "./helpers/multer.js";

const app = express();

// EJS
app.set("view engine", "ejs");

// Body resolvers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any())

// Static Files
app.use(express.static("public"));

// Passport
const sessionConf = {
	secret: process.env.secret_key,
	resave: true,
	saveUninitialized: true,
};
app.use(session(sessionConf));
app.use(passport.initialize());
app.use(passport.session());
// passport

// Route
app.use(router);

// Listen
app.listen(config.port, () =>
	console.log(`Server is running on http://localhost:${config.port}`)
);
