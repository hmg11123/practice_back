import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
 {
  name: {
   type: String,
   required: true,
  },
  nickName: {
   type: String,
   required: true,
  },
  passWord: {
   type: String,
   required: true,
  },
  email: {
   type: String,
   require: true,
  },
  basket: [
   {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
   },
  ],
  createdAt: {
   type: String,
   required: true,
  },
  isDelete: {
   type: Boolean,
   required: false,
  },
  review: [
   {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
   },
  ],
  affiliatedCompany: {
   type: String,
   required: false,
  },
 },
 { versionKey: false },
);

export default mongoose.model(`User`, User, "User");
