import cloudinary from 'cloudinary';
import { getEnvVar } from './getEnvVar.js';

cloudinary.config({ 
  cloud_name: getEnvVar("CLOUDINARY_CLOUD_NAME"), 
  api_key: getEnvVar("CLOUDINARY_API_KEY"), 
  api_secret: getEnvVar("CLOUDINARY_API_SECRET"),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  cloudinary.v2.url;
  return response.secure_url;
};