import React, { useState, useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import VideosApiService from "./Services/videos-api-service";
import CommentsApiService from "./Services/comments-api-service";
import { GlobalContext } from "./Context/GlobalContext";
import VideoBlogPage from "./Routes/VideoBlogPage";
import Landing from "./Routes/LandingPage";

export default function App() {
  const { setVideos, setComments } = useContext(GlobalContext);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    const videosRequest = VideosApiService.getAll();
    const commentsRequest = CommentsApiService.getAll();

    Promise.all([videosRequest, commentsRequest])
      .then((data) => {
        // setVideos
        setVideos(data[0]);

        // setComments
        setComments(data[1]);
      })
      .catch(setError);
  }, []);

  return (
    <>
      {error && <p className="error">{error}</p>}
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path="/blog" component={VideoBlogPage} />
      </Switch>
    </>
  );
}
