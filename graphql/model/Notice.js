import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Notice = new Schema(
 {
  title: {
   type: String,
   required: true,
  },
  desc: {
   type: String,
   required: true,
  },
  author: {
   type: String,
   required: true,
  },
  createdAt: {
   type: String,
   required: true,
  },
  detailAuthor: {
   type: String,
   required: true,
  },
 },
 { versionKey: false },
);

export default mongoose.model(`Notice`, Notice, `Notice`);
