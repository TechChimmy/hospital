import { mongoose } from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First Name must contain At Least 3 Characters!"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last Name must contain At Least 3 Characters!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please Provide A Valid Email!"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [11, "Phone Number must contain Exact 11 Digits!"],
    maxLength: [11, "Phone Number must contain Exact 11 Digits!"],
  },
  message: {
    type: String,
    required: true,
    minLength: [10, "Message must contain Exact 10 Characters!"],
  },
});

export const Message = mongoose.model("Message", messageSchema);
