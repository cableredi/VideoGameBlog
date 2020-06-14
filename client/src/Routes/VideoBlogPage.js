import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalContext";
import Welcome from "../Components/Welcome";
import Header from "../Components/Header";
import Videos from "../Components/Videos";
import Comments from "../Components/Comments";
import VideosApiService from "../Services/videos-api-service";

export default function VideoBlogPage() {
  const { videos, comments, setError, updateSelectedVideo, updateVideo } = useContext(
    GlobalContext
  );

  // Update videos state and database
  const handleUpdateVideo = selectedVideo => {
    updateVideo(selectedVideo);

    VideosApiService.patchVideos(selectedVideo)
      .then((data) => {})
      .catch(setError);
  }

  // render Video Comments
  const videoComments = () => {
    const selectedVideo = videos.find((video) => video.selected);
    const selectedComment = comments.filter(
      (comment) => comment.video_id === selectedVideo.video_id
    );

    return selectedComment;
  };

  // If user clicks on thumb change selected video
  const onClickSelectedVideo = (selectedVideo) => {
    updateSelectedVideo(selectedVideo);
  };

  // if user clicks video control play then update Views
  const onClickPlayVideo = (selectedVideo) => {
    selectedVideo.views++;

    handleUpdateVideo(selectedVideo);
  };

  // if user clicks on Thumbs Up then update Likes
  const onClickThumbsUp = (selectedVideo) => {
    selectedVideo.likes++;

    handleUpdateVideo(selectedVideo);
  };

  // if user clicks on Thumbs Down then update Dislikes
  const onClickThumbsDown = (selectedVideo) => {
    selectedVideo.dislikes++;

    handleUpdateVideo(selectedVideo);
  };

  return (
    <section className="VideoBlog">
      <Welcome />
      <Header />
      <Videos
        videos={videos}
        selectedVideo={onClickSelectedVideo}
        playVideo={onClickPlayVideo}
        thumbsUp={onClickThumbsUp}
        thumbsDown={onClickThumbsDown}
      />
      <Comments comments={videoComments()} />
    </section>
  );
}
