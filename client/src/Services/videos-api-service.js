import config from "../config";

const VideosApiService = {
  getAll() {
    return fetch(config.API_ENDPOINT_VIDEOS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  patchVideos(video) {
    return fetch(config.API_ENDPOINT_VIDEOS + `/${video.video_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
      body: JSON.stringify(video),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res
    );
  },
};

export default VideosApiService;