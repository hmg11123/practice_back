import Board from "../../../model/Board";
import User from "../../../model/User";
import { CURRENT_TIME } from "../../../../utils/commonUtils";
import mongoose from "mongoose";

export default {
 Query: {
  getAllBoard: async (_, args) => {
   try {
    const result = await Board.find({}, {}).populate({
     path: `author`,
     model: User,
    });

    console.log(result);

    return result;
   } catch (e) {
    console.log(e);
    return [];
   }
  },
 },
 Mutation: {
  createBoard: async (_, args) => {
   const { title, desc, author } = args;
   const current = await CURRENT_TIME();
   const authorId = mongoose.Types.ObjectId(author);
   try {
    const reuslt = await Board.create({
     title,
     desc,
     createdAt: current,
     author: authorId,
     hit: 0,
     isDelete: false,
    });

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
 },
};

// BOARD
// 아이디
// 제목
// 내용
// 게시날짜
// 게시자
// 조회수
// 삭제여부
