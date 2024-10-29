import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dx44ae7xd",
  api_key: "153441149783215",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: any) => {
  try {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadedFile = await cloudinary.uploader.upload(dataURI);
    console.log(uploadedFile);
    return uploadedFile.url;
  } catch (error) {
    console.log(error);
  }
};
