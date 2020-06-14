export default (state, action) => {
  switch (action.type) {
    case "SET_VIDEOS":
      const videos = action.payload;
      const newVideos = [];

      videos.map((video) => {
        return newVideos.push({
          video_id: video.video_id,
          title: video.title,
          video: video.video_link,
          thumb: video.thumb_link,
          views: video.views,
          likes: video.likes,
          dislikes: video.dislikes,
          selected: false,
        });
      });

      newVideos[0].selected = true;
      return newVideos;

    case "UPDATE_SELECTED_VIDEO":
      const selectedVideo = action.payload;
      const tempViews = state;

      tempViews.map((video) => {
        if (video.video_id !== selectedVideo.video_id) {
          video.selected = false;
        } else {
          video = selectedVideo;
          video.selected = true;
        }
        return video;
      });

      return [...tempViews];

    case "UPDATE_VIDEO":
      const updatedVideo = action.payload;

      return state.map((video) =>
        video.video_id !== updatedVideo.video_id ? video : updatedVideo
      );

    default:
      return state;
  }
};
