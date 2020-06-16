import React, { useContext, useEffect } from "react";
import LoginModalForm from "./Modals/LoginModalForm";
import RegistrationModalForm from "./Modals/RegistrationModalForm";
import TokenService from "../Services/token-service";
import AuthApiService from "../Services/auth-service";
import IdleService from "../Services/idle-service";
import useToggle from "./Hooks/useToggle";
import Modal from "./Modals/Modal";
import { GlobalContext } from "../Context/GlobalContext";

export default function Welcome() {
  const [openLogin, setOpenLogin] = useToggle(false);
  const [openRegistration, setOpenRegistration] = useToggle(false);

  const { setShowAddComments } = useContext(GlobalContext);

  useEffect(() => {
    TokenService.hasAuthToken()
      ? setShowAddComments(true)
      : setShowAddComments(false);
  }, [setShowAddComments, TokenService.hasAuthToken()]);

  const handleLogoutClick = () => {
    TokenService.clearAuthToken();
    setShowAddComments(false);
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
        <div className="spacer"></div>
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
        <div className="spacer"></div>
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

  const handleLoginClick = () => {
    setOpenRegistration(false);
    setOpenLogin(true);
  };

  const handleRegisterClick = () => {
    setOpenLogin(false);
    setOpenRegistration(true);
  };

  return (
    <>
      {TokenService.hasAuthToken() ? renderLogoutLink() : renderLoginLink()}
      {openLogin && (
        <Modal open={openLogin} toggle={setOpenLogin}>
          <LoginModalForm
            onLoginSuccess={() => handleLoginSuccess()}
            onRegisterClick={() => handleRegisterClick()}
          />
        </Modal>
      )}
      {openRegistration && (
        <Modal open={openRegistration} toggle={setOpenRegistration}>
          <RegistrationModalForm
            onRegistrationSuccess={handleRegistrationSuccess}
            onLoginClick={() => handleLoginClick()}
          />
        </Modal>
      )}
    </>
  );
}
