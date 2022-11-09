import { v2 as cloudinary } from "cloudinary";
export const uplaodImg = async (img) => {
  const folder = "/TRAVELIN";
  const imageConfig = {
    height: 1920,
    width: 1080,
    folder,
    crop: "fit",
    quality: 90,
  };

  const imgObj = await cloudinary.uploader.upload(img, imageConfig);

  return imgObj.secure_url;
};
