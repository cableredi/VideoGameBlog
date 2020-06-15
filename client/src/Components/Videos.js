import React from "react";
import ThumbsUp from "../Assets/Images/thumbs_up.svg";
import ThumbsDown from "../Assets/Images/thumbs_down.svg";
import TokenService from "../Services/token-service";
import CommentForm from "./CommentForm";

export default function Videos(props) {
  const { videos, selectedVideo, thumbsUp, thumbsDown, playVideo, handleSubmitComments } = props;

  const handleVideoClick = (video) => {
    selectedVideo(video);
  };

  const handleThumbsUpClick = (video) => {
    thumbsUp(video);
  };

  const handleThumbsDownClick = (video) => {
    thumbsDown(video);
  };

  const handleVideoControls = (video) => {
    playVideo(video);
  };

  const getVideos = videos.map((video) => (
    <div
      className="Videos__thumbs-video"
      key={video.title}
      onClick={() => handleVideoClick(video)}
    >
      <img
        src={video.thumb}
        alt={video.title}
        className={`${video.selected ? "selected" : null}`}
      />
    </div>
  ));

  const getSelectedVideo = () => {
    const found = videos.find((video) => video.selected === true);

    return found ? renderSelectedVideo(found) : null;
  };

  const renderSelectedVideo = (video) => (
    <>
      <div className="Videos__selectedVideo">
        <video
          controls
          src={video.video}
          type="video/mp4"
          onPlay={() => handleVideoControls(video)}
        />
      </div>

      <div className="Videos__thumbs">{videos.length > 0 && getVideos}</div>

      <div className="Videos__meta">
        <div className="Videos__meta-views">{video.views} views</div>
        <div className="Videos__meta-thumbs">
          <img
            src={ThumbsUp}
            alt="Thumbs Up"
            onClick={() => handleThumbsUpClick(video)}
          />{" "}
          {video.likes}
          <img
            src={ThumbsDown}
            alt="Thumbs Up"
            onClick={() => handleThumbsDownClick(video)}
          />{" "}
          {video.dislikes}
        </div>
      </div>

      {TokenService.hasAuthToken() ? (
        <CommentForm selectedVideo={video} handleSubmitComments={handleSubmitComments} />
      ) : (
        <div className="Videos__comments">
          <span className="Videos__comments-login">
            Login to add a sweet comment
          </span>
        </div>
      )}
    </>
  );

  return (
    <div className="Videos">
      <div className="Videos__header">24G Super Awesome Video</div>

      {getSelectedVideo()}
    </div>
  );
}
