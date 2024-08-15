import mongoose from "mongoose";

const formSchema = mongoose.Schema({
  name: {
    type: String,
    requrired: true,
  },
  email: {
    type: String,
    requrired: true,
  },
  occupation: {
    type: String,
    requrired: true,
  },
});

export const Form = mongoose.model("myForm" , formSchema);