import { useMutation } from "@tanstack/react-query";
import supabase, { supabaseUrl } from "./supabase";

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
  // console.log(data);
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

// recall cabin
export async function updateCurUser({ fullName, password, avatar }) {
  // 1. Update pwd or fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3. update avatar in the user
  const { data: updateUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateError) throw new Error(updateError.message);
  return updateUser;
}
