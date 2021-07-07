// BOARD
// 아이디
// 제목
// 내용
// 게시날짜
// 게시자
// 조회수
// 삭제여부
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Board = new Schema({
 title: {
  type: String,
  required: true,
 },
 desc: {
  type: String,
  required: true,
 },
 createdAt: {
  type: String,
  required: true,
 },
 author: {
  type: String,
  required: true,
 },
 detailAuthor: {
  type: String,
  required: true,
 },
 hit: {
  type: Number,
  required: true,
 },
 isDelete: {
  type: Boolean,
  required: true,
 },
});

export default mongoose.model(`Board`, Board, `Board`);
