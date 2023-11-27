import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins failed to be loaded");
  }

  return data;
}

export async function addNewCabin(newCabin) {
  //an example path: https://deygkmjhmenfbmocefki.supabase.co/storage/v1/object/public/cabin_img/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  console.log(imageName);
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin_img/${imageName}`;
  // Step1: create a new cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  // Step2: after successfully created a cabin, upload an image
  // docs link: https://supabase.com/docs/reference/javascript/auth-admin-generatelink
  const { error: storageError } = await supabase.storage
    .from("cabin_img")
    .upload(imageName, newCabin.image);

  // Step3: Delete!! the cabin if there is an error with image uploading
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data?.id);
    console.log(storageError);
    throw new Error("There was an error with cabin image uploading");
  }

  return data;
}

export async function deteleCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins failed to be deleted");
  }
}
