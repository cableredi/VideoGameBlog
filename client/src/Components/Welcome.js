import React from "react";
import LoginModalForm from "../Components/LoginModalForm";
import RegistrationModalForm from "../Components/RegistrationModalForm";
import TokenService from "../Services/token-service";
import AuthApiService from "../Services/auth-service";
import IdleService from "../Services/idle-service";
import useToggle from "../Components/Hooks/useToggle";
import Modal from "../Components/Modal";

export default function Welcome() {
  const [openLogin, setOpenLogin] = useToggle(false);
  const [openRegistration, setOpenRegistration] = useToggle(false);

  const handleLogoutClick = () => {
    TokenService.clearAuthToken();
  };

  const renderLogoutLink = () => {
    return (
      <div className="Welcome">
        <div className="Welcome__name">
          Welcome,
          {TokenService.hasAuthToken() ? (
            <span> {TokenService.readJwtToken().first_name} </span>
          ) : null}
        </div>
        <div className="Welcome__nav">
          <ul>
            <li>
              <button onClick={handleLogoutClick}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderLoginLink = () => {
    return (
      <div className="Welcome">
        <div className="Welcome__name">Welcome</div>

        <div className="Welcome__nav">
          <ul>
            <button onClick={() => setOpenLogin()}>Login</button>
            <button onClick={() => setOpenRegistration()}>Register</button>
          </ul>
        </div>
      </div>
    );
  };

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
      /* the timeout will call this callback just before the token expires */
      AuthApiService.postRefreshToken();
    });
    setOpenLogin(false);
  };

  const handleRegistrationSuccess = () => {
    setOpenRegistration(false);
    setOpenLogin(true);
  };

  return (
    <>
      {TokenService.hasAuthToken() ? renderLogoutLink() : renderLoginLink()}
      {openLogin && (
        <Modal open={openLogin} toggle={setOpenLogin}>
          <LoginModalForm onLoginSuccess={() => handleLoginSuccess()} />
        </Modal>
      )}
      {openRegistration && (
        <Modal open={openRegistration} toggle={setOpenRegistration}>
          <RegistrationModalForm
            onRegistrationSuccess={handleRegistrationSuccess}
          />
        </Modal>
      )}
    </>
  );
}
