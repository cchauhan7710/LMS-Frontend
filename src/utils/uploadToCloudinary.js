export async function uploadToCloudinary(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "Sushil Arora"); // your preset

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/difsifvqz/upload", 
    {
      method: "POST",
      body: data
    }
  );

  const json = await res.json();
  return json.secure_url; // this is cloudinary URL
}
  