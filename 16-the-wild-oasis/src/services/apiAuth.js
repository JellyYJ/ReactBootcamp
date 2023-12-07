import supabase from "./supabase";

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  // console.log(data);

  if (error) {
    console.log(error.message);
    throw new Error("There was an error logging in");
  }

  return data;
}
