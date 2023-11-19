import { FC, useState } from "react";
import "./index.styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Input } from "antd";

const Login: FC = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const isFormValid = () => {
    if (!username?.trim().length) {
      setErrorMessage("Username field mandatory.");
      return false;
    }
    if (!password?.trim().length) {
      setErrorMessage("Password field mandatory.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const registerUser = async () => {
    if (isFormValid()) {
      try {
        const response = await axios.post("http://localhost:8000/session", {
          username,
          password,
          is_admin: false,
        });
        sessionStorage.setItem("token", response.data);
        setShowAlert(true);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (e) {
        setErrorMessage("Username or password is incorrect!");
      }
    
    }
  };

  return (
    <>
      <div className="formContainer">
        {showAlert && (
          <Alert
            message="Login successful! You will be redirected to home page."
            type="success"
          />
        )}
        <h1 className="formTitle">Login</h1>
        <Input
          className="input"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input.Password
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Button type="primary" danger onClick={() => registerUser()}>
          Login
        </Button>
      </div>
    </>
  );
};

export default Login;
