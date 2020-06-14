import React, { createContext, useReducer } from "react";
import VideosReducer from "./VideosReducer";
import CommentsReducer from "./CommentsReducer";

export const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
  const [videos, dispatchVideos] = useReducer(VideosReducer, []);
  const [comments, dispatchComments] = useReducer(CommentsReducer, []);

  const setVideos = (videos) => {
    dispatchVideos({
      type: "SET_VIDEOS",
      payload: videos,
    });
  };

  const updateSelectedVideo = (selectedVideo) => {
    dispatchVideos({
      type: "UPDATE_SELECTED_VIDEO",
      payload: selectedVideo,
    });
  };

  const updateVideo = (selectedVideo) => {
    dispatchVideos({
      type: "UPDATE_VIDEO",
      payload: selectedVideo,
    });
  };

  const setComments = (comments) => {
    dispatchComments({
      type: "SET_COMMENTS",
      payload: comments,
    });
  };

  const addComment = (comment) => {
    dispatchComments({
      type: "ADD_COMMENT",
      payload: comment,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        videos: videos,
        comments: comments,
        setVideos,
        updateSelectedVideo,
        updateVideo,
        setComments,
        addComment,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
