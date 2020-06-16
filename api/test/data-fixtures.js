const jwt = require("jsonwebtoken");

function makeUsersArray() {
  return [
    {
      user_id: 1,
      username: "testuser1",
      first_name: "Test1",
      last_name: "User1",
      avatar: "none",
      password: "$2a$12$ZPfiA7T1e0XBIhXGvuf10.CnheiFG.hCfBSX7ZzT4oGhNjZqrWVb.",
      date_created: new Date("2020-01-22T16:28:32.615Z"),
    },
  ];
}

function makeVideosArray() {
  return [
    {
      video_id: 1,
      title: "Video Title 1",
      video_link: "https://www.video1link.com",
      thumb_link: "https://www.thumb1link.com",
      views: "1",
      likes: "1",
      dislikes: "1",
    },
    {
      video_id: 2,
      title: "Video Title 2",
      video_link: "https://www.video2link.com",
      thumb_link: "https://www.thumb2link.com",
      views: "2",
      likes: "2",
      dislikes: "2",
    },
  ];
}

function makeExpectedVideo() {
  return {
    video_id: 1,
    title: "Video Title 1",
    video_link: "https://www.video1link.com",
    thumb_link: "https://www.thumb1link.com",
    views: "1",
    likes: "1",
    dislikes: "1",
  };
}

function makeCommentsArray() {
  return [
    {
      comment_id: 1,
      video_id: 1,
      user_id: 1,
      user_comment: "This is a comment for Video 1 User 1",
      date_created: "2015-03-27T12:00:00-06:30",
    },
    {
      comment_id: 2,
      video_id: 2,
      user_id: 1,
      user_comment: "This is a comment for Video 2 User 1",
      date_created: "2015-03-27T12:00:00-06:30",
    },
  ];
}

function makeExpectedComment() {
  return {
    comment_id: 1,
    video_id: 1,
    user_id: 1,
    user_comment: "This is a comment for Video 1 User 1",
    date_created: "2015-03-27T12:00:00-06:30",
  };
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.user_id, first_name: user.first_name }, secret, {
    subject: user.username,
    algorithm: "HS256",
  });

  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeVideosArray,
  makeExpectedVideo,
  makeCommentsArray,
  makeExpectedComment,
  makeAuthHeader,
};
