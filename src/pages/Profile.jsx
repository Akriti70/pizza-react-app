
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current user
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error(error.message);
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  if (!user) {
    return (
      <div className="profile-container">
        <h2>You are not logged in</h2>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>Welcome, {user.email}</h1>
      <p>User ID: {user.id}</p>
      <p>Account Created: {new Date(user.created_at).toLocaleString()}</p>
    </div>
  );
}
