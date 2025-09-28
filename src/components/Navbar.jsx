import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import "./Navbar.css";

export default function Navbar() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Load session on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen to session changes (login/logout)
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    ).data;

    return () => subscription?.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null); // local state भी reset कर दो
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">PizzaApp</Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/cart">Cart</Link>

          {!session ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <Link to="/profile">Profile</Link>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
