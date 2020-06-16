import config from "../config";
import TokenService from './token-service';

const CommentsApiService = {
  getAll() {
    return fetch(config.API_ENDPOINT_COMMENTS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postComment(comment) {
    return fetch(config.API_ENDPOINT_COMMENTS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(comment),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  getById(comment_id) {
    return fetch(config.API_ENDPOINT_COMMENTS + `/${comment_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.API_KEY}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  }
};

export default CommentsApiService;
