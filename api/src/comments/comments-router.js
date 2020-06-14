const express = require("express");
const xss = require("xss");
const { requireAuth } = require("../middleware/jwt-auth");
const CommentsService = require("./comments-service");

const commentsRouter = express.Router();
const jsonParser = express.json();

const serializeComments = (comment) => ({
  comment_id: comment.comment_id,
  video_id: comment.video_id,
  user_id: comment.user_id,
  user_comment: xss(comment.user_comment),
  date_created: comment.date_created,
  first_name: comment.first_name,
  last_name: comment.last_name,
  avatar: comment.avatar
});

const serializeAddComments = (comment) => ({
  comment_id: comment.comment_id,
  video_id: comment.video_id,
  user_id: comment.user_id,
  user_comment: xss(comment.user_comment),
  date_created: comment.date_created,
});

commentsRouter
  .route("/")

  .get((req, res, next) => {
    CommentsService.getAllComments(req.app.get("db"))
      .then((comments) => {
        res.json(comments.map(serializeComments));
      })
      .catch(next);
  })

  .post(requireAuth, jsonParser, (req, res, next) => {
    const { video_id, user_id, comment } = req.body;

    const newComment = {
      video_id,
      user_id,
      comment,
    };

    const numberOfValues = Object.values(newComment).filter(Boolean).length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain videos id, name, avatar and comment`,
        },
      });
    }

    newComment.user_id = req.user.user_id;

    CommentsService.insertComment(req.app.get("db"), newComment)
      .then((comment) => {
        logger.info(`Comments with id ${comment.comment_id} created.`);
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${comment.comment_id}`))
          .json(serializeAddComments(comment));
      })
      .catch(next);
  });

module.exports = commentsRouter;
