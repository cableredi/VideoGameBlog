import React from "react";
import useForm from "./Hooks/useForm";
import ValidateError from './ValidateError';

export default function CommentForm(props) {
  const { selectedVideo, handleSubmitComments } = props;
  const stateSchema = {
    user_comment: { value: "", error: "" },
  };

  const onSubmitForm = (state) => {
    const newComment = {
      video_id: selectedVideo.video_id,
      user_comment: state.user_comment,
    }
    handleSubmitComments(newComment);
    state.user_comment = '';
  };

  const stateValidatorSchema = {
    user_comment: {
      required: true,
    },
  };

  const {
    values,
    errors,
    dirty,
    handleOnChange,
    handleOnSubmit,
    disable,
  } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);

  const { user_comment } = values;

  return (
    <>
      <form className="Videos__comments" onSubmit={handleOnSubmit}>
        <div className="Videos__comments-header">Comments</div>
        <textarea
          name="user_comment"
          id="user_comment"
          placeholder="Type up a sweet comment..."
          value={user_comment}
          onChange={handleOnChange}
        />
        <div>
          {errors.user_comment && dirty.user_comment && (
            <ValidateError message={errors.user_comment} />
          )}
        </div>
        <div className="Videos__comments-submit">
          <button type="submit" disabled={disable}>add comment</button>
        </div>
      </form>
    </>
  );
}
