import createError from "http-errors";
import express, { NextFunction, Request, Response } from "express";
import logger from "morgan";
import flash from "connect-flash";
import passport from "passport";
import { Strategy as JWTStrategy } from "passport-jwt";
import dotenv from "dotenv";
dotenv.config();

import RequestError from "./types/express/";

const app = express();

app.use(passport.initialize());
app.use(flash());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(
  (err: RequestError, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  }
);

export default app;
