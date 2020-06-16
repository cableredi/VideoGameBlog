import React from "react";
import Avatar from "../Assets/Images/placeholder_avatar.png";
import { getDateTimeDifference } from "./Utils/utils";

export default function Comments(props) {
  const { comments } = props;
  comments.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));

  const getComments =
    comments &&
    comments.length > 0 &&
    comments.map((comment) => (
      <div className="Comments" key={comment.comment_id}>
        <div className="Comments__avatar">
          <img
            src={Avatar}
            alt={comment.first_name + " " + comment.last_name}
          />
        </div>
        <div className="Comments__name">
          {comment.first_name + " " + comment.last_name}
        </div>
        <div className="Comments__dateCreated">
          {getDateTimeDifference(comment.date_created)}
        </div>
        <div className="Comments__comment">{comment.user_comment}</div>
      </div>
    ));

  return <div>{getComments}</div>;
}
