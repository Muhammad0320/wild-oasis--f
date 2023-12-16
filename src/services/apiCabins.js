import { supabase, supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("Cabin could not be loaded");

  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabin could not be deleted");

  return data;
};

export const createEditCabin = async (newCabin, id) => {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  //https://zkfxpzxzjjkdrgrrxdrg.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  const { data, error } = await query.select().single();

  if (error) throw new Error("Cabin could not be created");

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // if (!storageError) return data;
    
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data?.id);

    throw new Error("Cabin image was not uploaded and cabin was not created");
  }

  return data;
};
