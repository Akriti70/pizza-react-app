
import { supabase } from "./supabaseClient"

// Signup
export async function signup(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  return { data, error }
}

// Login
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

// Logout
export async function logout() {
  const { error } = await supabase.auth.signOut()
  return { error }
}
