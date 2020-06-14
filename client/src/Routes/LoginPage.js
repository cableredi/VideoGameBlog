import React from "react";
import LoginModalForm from "../Components/LoginModalForm";
import TokenService from "../Services/token-service";
import AuthApiService from "../Services/auth-service";
import IdleService from "../Services/idle-service";

export default function LoginPage() {
  const logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.resetState({});
    this.forceUpdate();
  };

  const handleLoginSuccess = () => {
    IdleService.setIdleCallback(() => logoutFromIdle());
    IdleService.registerIdleTimerResets();
    TokenService.queueCallbackBeforeExpiry(() => {
      /* the timoue will call this callback just before the token expires */
      AuthApiService.postRefreshToken();
    });
  };

  return (
    <section className="Login">
      <h2>Login</h2>

      <LoginModalForm onLoginSuccess={() => handleLoginSuccess()} />
    </section>
  );
}
