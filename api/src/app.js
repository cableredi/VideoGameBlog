require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const validateBearerToken = require("./validate-bearer-token");
const errorHandler = require("./error-handler");
const videosRouter = require("./videos/videos-router");
const commentsRouter = require('./comments/comments-router');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "dev";

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
//app.use(validateBearerToken);

app.use("/api/videos", videosRouter);
app.use("/api/comments", commentsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.get("/", (req, res) => {
  res.json({ ok: true });
});

/* Error handling */
app.use(errorHandler);

module.exports = app;
