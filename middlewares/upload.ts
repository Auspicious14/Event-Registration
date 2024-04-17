import { v2 as cloudinary } from "cloudinary";

export const mapFiles = async (files: any) => {
  let fls: Array<{}> = [];

  if (files && files?.length > 0) {
    for await (let file of files) {
      fls.push({
        name: file?.filename,
        type: file?.filetype,
        uri: file?.base64Str.includes("res.cloudinary.com")
          ? file?.base64Str
          : await upLoadFiles(file?.base64Str, file?.filename),
      });
    }
  }

  return fls;
};

const upLoadFiles = async (file: any, fileName?: any) => {
  const uri = await cloudinary.uploader.upload(file, { public_id: fileName });

  return uri?.secure_url;
};
