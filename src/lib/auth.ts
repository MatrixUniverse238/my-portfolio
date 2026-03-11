import { supabase } from "./supabase";

// Sign in
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) throw error;
  return data;
}

// Sign out
export async function signOut() {
  await supabase.auth.signOut();
}

// Get current user
export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}