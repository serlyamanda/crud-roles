import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("email", user.email);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Incorrect email or password");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div>
          <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
