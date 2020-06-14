import React from "react";
import { useHistory } from "react-router-dom";
import RegistrationForm from "../Components/RegistrationForm";

export default function RegistrationPage() {
  const history = useHistory();

  const handleRegistrationSuccess = () => {
    history.push("/login");
  };

  return (
    <section className="Registration">
      <div className="Registration__header">Register</div>
      <RegistrationForm onRegistrationSuccess={handleRegistrationSuccess} />
    </section>
  );
}