import { FC, useState } from "react";
import "./index.styles.css";
import { Alert, Button, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: FC = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConformPassword] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const isFormValid = () => {
    if (!username?.trim().length) {
      setErrorMessage("Username field mandatory.");
      return false;
    }
    if (!email?.trim().length) {
      setErrorMessage("Email field mandatory.");
      return false;
    }
    if (!password?.trim().length) {
      setErrorMessage("Password field mandatory.");
      return false;
    }
    if (!phone?.trim().length) {
      setErrorMessage("Phone field mandatory.");
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Password  does not match");
    }
    if (!email.includes("@")) {
      setErrorMessage("Email  is not valid");
    }
    setErrorMessage("");
    return true;
  };

  const registerUser = async () => {
    if (isFormValid()) {
      const response = await axios.post("http://localhost:8000/users", {
        username,
        email,
        password,
        is_admin: false,
        phone,
      });
      if (response) {
        setShowAlert(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        }
    }
  };

  return (
    <>
      <div className="formContainer">
      {showAlert && (
        <Alert message="Register successful! You will be redirected to login." type="success" />
      )}
        <h1 className="formTitle">Register</h1>
        <div className="formLabel">Email</div>
        <Input
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="formLabel">Username</div>
        <Input
          className="input"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <div className="formLabel">Password</div>
        <Input.Password
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="formLabel">Confirm Password</div>
        <Input.Password
          className="input"
          placeholder="Confirm Password"
          onChange={(e) => setConformPassword(e.target.value)}
        />
        <div className="formLabel">Phone Number</div>
        <Input
          className="input"
          placeholder="Phone Number"
          onChange={(e) => setPhone(e.target.value)}
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Button className="registerButton"type="primary" danger onClick={() => registerUser()}>
          Create Account
        </Button>
      </div>
    </>
  );
};

export default Register;
