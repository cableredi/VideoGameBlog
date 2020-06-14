import React, { useState, useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import VideosApiService from "./Services/videos-api-service";
import CommentsApiService from "./Services/comments-api-service";
import { GlobalContext } from "./Context/GlobalContext";
import VideoBlogPage from "./Routes/VideoBlogPage";
import LoginPage from "./Routes/LoginPage";
import RegistrationPage from "./Routes/RegistrationPage";

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
      <Switch>
        <Route path={"/login"} component={LoginPage} />
        <Route path={"/registration"} component={RegistrationPage} />
        {error && <p className="error">{error}</p>}
        <Route exact path="/" component={VideoBlogPage} />
      </Switch>
  );
}
