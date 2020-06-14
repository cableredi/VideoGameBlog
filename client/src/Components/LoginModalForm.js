import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useForm from "./Hooks/useForm";
import AuthApiService from "../Services/auth-service";
import ValidateError from "./ValidateError";

const Required = () => <span className="form__required">*</span>;

export default function LoginModalForm(props) {
  const { onLoginSuccess } = props;
  const [error, setError] = useState("");

  const stateSchema = {
    username: { value: "", error: "" },
    password: { value: "", error: "" },
  };

  let history = useHistory();

  /***********************/
  /* handleSubmitJWTAuth */
  /***********************/
  const handleSubmitJwtAuth = (state) => {
    setError("");

    const { username, password } = state;

    AuthApiService.postLogin({
      username: username,
      password: password,
    })
      .then((res) => {
        onLoginSuccess();
        history.goBack();
      })
      .catch((res) => {
        setError(res.error);
      });
  };

  /************************/
  /* Validate Form Fields */
  /************************/
  const stateValidatorSchema = {
    username: {
      required: true,
    },
    password: {
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
  } = useForm(stateSchema, stateValidatorSchema, handleSubmitJwtAuth);

  const { username, password } = values;

  return (
    <form className="Login__form" onSubmit={handleOnSubmit}>
      <div className="required">* Required Fields</div>

      <ul className="flex-outer">
        <li role="alert">
          {error && <p className="form__input-error">{error}</p>}
        </li>

        <li className="username">
          <label htmlFor="username">
            User name
            <Required />
          </label>
          <input
            required
            name="username"
            id="username"
            value={username}
            onChange={handleOnChange}
          />
        </li>
        <li>
          {errors.username && dirty.username && (
            <ValidateError message={errors.username} />
          )}
        </li>

        <li className="password">
          <label htmlFor="password">
            Password
            <Required />
          </label>
          <input
            required
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={handleOnChange}
          />
        </li>
        <li>
          {errors.password && dirty.password && (
            <ValidateError message={errors.password} />
          )}
        </li>
      </ul>
      <div className="form__button-group">
        <button className="button" type="submit" disabled={disable}>
          Login
        </button>
      </div>
    </form>
  );
}
