import React, { useState } from "react";
import useForm from "./Hooks/useForm";
import AuthApiService from "../Services/auth-service";
import ValidateError from "./ValidateError";

export default function LoginModalForm(props) {
  const { onLoginSuccess } = props;
  const [error, setError] = useState("");

  const stateSchema = {
    username: { value: "", error: "" },
    password: { value: "", error: "" },
  };

  const Required = () => <span className="Form__required">*</span>;

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
    <form className="Form" onSubmit={handleOnSubmit}>
      <div className="Form__header">Login</div>

      <ul className="Form__outer">
        <li role="Form__alert">
          {error && <p className="Form__error">{error}</p>}
        </li>

        <li className="username">
          <label htmlFor="username">
            Username
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
        <li className='Form__button'>
          <button className="button" type="submit" disabled={disable}>
            Login
          </button>
        </li>
      </ul>
    </form>
  );
}
