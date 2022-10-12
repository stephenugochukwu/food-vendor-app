import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import vendorsRouter from "./routes/vendor";

import adminRouter from "./routes/admin";

import db from "./config/database.config";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/vendors", vendorsRouter);

// db.sync({ force: true }) - to reset the database
db.sync()
  .then(() => {
    console.log(`Database connected successfully`);
  })
  .catch((err) => console.log(err));

export default app;
