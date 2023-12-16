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

export async function getCurUser() {
  const { data: session } = await supabase.auth.getSession();
  // no current user
  if (!session?.session) return null;

  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error) {
    console.log(error);
    throw new Error("There was an error get current user data");
  }

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
    throw new Error("There was an erro logging out");
  }
}

export async function signUp({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
