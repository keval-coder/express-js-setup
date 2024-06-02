import createError from "http-errors";
import express, { json, urlencoded } from "express";
import path, { join } from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import indexRouter from "./src/routes/index.js";
import { ErrorHandler } from "./src/utils/error-handler/error-handler.js";
import { connectDB } from "./src/database/connection.js";
import passport from "passport";
import { passportStrategy } from "./src/passport/passport.js";

const NODE_ENV = process.env.NODE_ENV || "dev";
dotenv.config({
  path: [
    path.join(process.cwd(), "env/.env"),
    path.join(process.cwd(), `env/.${NODE_ENV}.env`),
  ],
});

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// Connect Database
connectDB();

// Custom token for morgan logger
morgan.token("host", function (req, res) {
  return req.hostname;
});
// Custom Logger Pattern
app.use(morgan(":method :url :status - :response-time ms"));

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(process.cwd(), "public")));

// Passport middleware
app.use(passport.initialize());

// Passport config
passportStrategy(passport);

app.use("/api", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(ErrorHandler);

export default app;
