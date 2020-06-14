import React from "react";
import { formatDistanceToNow } from 'date-fns';
import Avatar from "../Assets/Images/placeholder_avatar.png";

export default function Comments(props) {
  const { comments } = props;

  const getDateTimeDifference = (date) => {
    let createdDate = new Date(date);
    createdDate.toString();

    return formatDistanceToNow(createdDate);
  }

  const getComments =
    comments &&
    comments.length > 0 &&
    comments.map((comment) => (
      <div className="Comments" key={comment.comment_id}>
        <div className="Comments__avatar">
          <img src={Avatar} alt={comment.first_name + ' ' + comment.last_name} />
        </div>
        <div className="Comments__name">{comment.first_name + ' ' + comment.last_name}</div>
        <div className="Comments__dateCreated">
          {getDateTimeDifference(comment.date_created)}
        </div>
        <div className="Comments__comment">{comment.user_comment}</div>
      </div>
    ));

  return <div>{getComments}</div>;
}
