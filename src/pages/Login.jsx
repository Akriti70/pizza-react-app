import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Login successful!");
    }
  };

  return (
    <div className="login-hero">
      <div className="overlay"></div>
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Welcome Back 👋</h2>
        <p className="sub-text">Please login to continue</p>
        {message && <p className="message">{message}</p>}
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">Login</button>
        <p className="signup-text">
          Don’t have an account? <a href="#">Sign up</a>
        </p>
      </form>
    </div>
  );
}
