/** Client-side unsigned uploads (Cloudinary free tier). */

export const isCloudinaryConfigured =
  !!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME &&
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME !== "your_cloud_name" &&
  !!import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET &&
  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET !== "your_unsigned_preset_name";

const UPLOAD_FOLDER = "primelink-products";

export async function uploadImage(file: File): Promise<string> {
  if (!isCloudinaryConfigured) {
    throw new Error(
      "Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env"
    );
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", UPLOAD_FOLDER);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message ?? "Image upload failed");
  }

  if (!data.secure_url) {
    throw new Error("Upload succeeded but no image URL was returned");
  }

  return data.secure_url as string;
}
