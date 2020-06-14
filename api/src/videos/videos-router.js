const express = require("express");
const xss = require("xss");
const VideosService = require("./videos-service");

const videosRouter = express.Router();
const jsonParser = express.json();

const serializeVideos = (video) => ({
  video_id: video.video_id,
  title: xss(video.title),
  video_link: xss(video.video_link),
  thumb_link: xss(video.thumb_link),
  views: video.views,
  likes: video.likes,
  dislikes: video.dislikes,
});

videosRouter
  .route("/")

  .get((req, res, next) => {
    VideosService.getAll(req.app.get("db"))
      .then((videos) => {
        res.json(videos.map(serializeVideos));
      })
      .catch(next);
  });

  videosRouter
  .route("/:video_id")

  .all((req, res, next) => {
    VideosService.getById(req.app.get("db"), req.params.video_id)
      .then((video) => {
        if (!video) {
          return res.status(404).json({
            error: { message: "Video Not Found" },
          });
        }
        res.video = video;
        next();
      })
      .catch(next);
  })

  .patch(jsonParser, (req, res, next) => {
    const {
      views,
      likes,
      dislikes,
    } = req.body;

    const videoToUpdate = {
      views,
      likes,
      dislikes,
    };

    const numberOfValues = Object.values(videoToUpdate).filter(Boolean)
      .length;
    if (numberOfValues === 0) {
      return res.status(400).json({
        error: {
          message: `Request body must contain views, likes, and dislikes`,
        },
      });
    }

    VideosService.updateVideo(
      req.app.get("db"),
      req.params.video_id,
      videoToUpdate
    )
      .then((numRowsAffected) => {
        res.sendStatus(204);
      })
      .catch(next);
  });

module.exports = videosRouter;
