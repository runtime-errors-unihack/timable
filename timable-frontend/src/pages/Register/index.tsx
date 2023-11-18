import { FC, useState } from "react";
import "./index.styles.css";
import { Button, Input } from "antd";

const Register: FC = () => {
  const [userName, setUserName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [phone, setPhone] = useState<string>();

  const registerUser = () => {
    
  }

  return (
    <div className="formContainer">
      <h1 className="formTitle">Register</h1>
      <Input className="input" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
      <Input className="input" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
      <Input className="input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <Input className="input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <Button type='primary' danger>Create Account</Button>
    </div>
  );
};

export default Register;
