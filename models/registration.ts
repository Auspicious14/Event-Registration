import mongoose, { Schema } from "mongoose";
import { isEmail } from "validator";

const RegistrationSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: isEmail,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    workshopEvent: {
      type: String,
    },
  },
  { timestamps: true }
);

export const RegistrationModel = mongoose.model(
  "registration",
  RegistrationSchema
);
