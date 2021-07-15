import Board from "../../../model/Board";
import User from "../../../model/User";
import { CURRENT_TIME } from "../../../../utils/commonUtils";
import mongoose from "mongoose";

export default {
 Query: {
  getAllBoard: async (_, args) => {
   const { searchValue, limit, currentPage } = args;
   try {
    const result = await Board.find({}, {})
     .sort({
      createdAt: -1,
     })
     .limit(limit)
     .skip(currentPage * limit);

    console.log(result);

    return result;
   } catch (e) {
    console.log(e);
    return [];
   }
  },
  getAllBoardlength: async (_, args) => {
   const { searchValue } = args;
   try {
    const result = await Board.find({
     $or: [
      { title: { $regex: `.*${searchValue}.*` } },
      { desc: { $regex: `.*${searchValue}.*` } },
     ],
    });

    const cnt = result.length;

    return parseInt(cnt);
   } catch (e) {
    console.log(e);
    return 0;
   }
  },

  getBoardTotalPage: async (_, args) => {
   const { searchValue, limit } = args;

   try {
    const result = await Board.find({
     title: { $regex: `.*${searchValue}.*` },
    }).sort({
     createdAt: -1,
    });

    const cnt = result.length;

    const realTotalPage = cnt % limit > 0 ? cnt / limit + 1 : cnt / limit;

    return parseInt(realTotalPage);
   } catch (e) {
    console.log(e);
    return 0;
   }
  },
  getBoard: async (_, args) => {
   const { id } = args;

   try {
    const result = await Board.findOne({ _id: id });

    return result;
   } catch (e) {
    console.log(e);
    return {};
   }
  },
 },
 Mutation: {
  createBoard: async (_, args) => {
   const { title, desc, author, detailAuthor } = args;
   const current = await CURRENT_TIME();
   const detailAuthorId = mongoose.Types.ObjectId(detailAuthor);
   try {
    const reuslt = await Board.create({
     title,
     desc,
     createdAt: current,
     author,
     detailAuthor: detailAuthorId,
     hit: 0,
     isDelete: false,
    });

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  updateBoard: async (_, args) => {
   const { title, desc, id } = args;

   try {
    const result = await Board.updateOne(
     { _id: id },
     { $set: { title, desc } },
    );

    console.log(result);

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  deleteBoard: async (_, args) => {
   const { id } = args;

   try {
    const result = await Board.deleteOne({ _id: id });

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
