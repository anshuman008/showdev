import { supabase } from "./supabaseClient";

export const uploadImage = async (file) => {

   console.log("image is here!!!");

   console.log("the file is here!!",file);

  const fileName = `${Date.now()}-${file.name}`; // Generate a unique filename
  const { data, error } = await supabase.storage
    .from('showdev-bucket') // Bucket name
    .upload(fileName, file, {
      cacheControl: '3600', // Optional: Set cache control headers
      upsert: false         // Prevent overwriting files with the same name
    });

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }
  
  // Return the URL if public, or the path if private
  const url = `${supabase.storage.from('showdev-bucket').getPublicUrl(fileName).data.publicUrl}`;
  return url;
};


export const getImageUrl = (fileName) => {
    const { data } = supabase.storage.from('showdev-bucket').getPublicUrl(fileName);
    return data.publicUrl;
};
  