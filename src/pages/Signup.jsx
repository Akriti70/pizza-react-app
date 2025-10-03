
import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Signup successful! Please check your email.");
    }
  };

  return (
    <div className="signup-hero">
      <div className="overlay"></div>
      <form className="signup-card" onSubmit={handleSignup}>
        <h2>Create Account ✨</h2>
        <p className="sub-text">Join us and get started today</p>
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

        <button type="submit" className="signup-btn">Sign Up</button>

        <p className="login-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
