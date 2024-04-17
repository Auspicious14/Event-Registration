import mongoose, { Schema } from "mongoose";

const UploadSchema = new Schema({
  image: {
    base64Str: {
      type: String,
    },
    filename: {
      type: String,
    },
    filetype: {
      type: String,
    },
  },
});

export const UploadModel = mongoose.model("upload", UploadSchema);
