import User from "../../../model/User";
import { CURRENT_TIME } from "../../../../utils/commonUtils";
import crypto from "crypto";

// USER
// 아이디
// 비밀번호
// 이름
// 별명
// 장바구니
// 생성날자
// 삭제 여부
// 유저가 쓴 뎃글
// 소속회사

export default {
 Query: {
  getAllUser: async (_, args) => {
   try {
    console.log("getAllUser실행");
    const result = await User.find({}, {});
    return result;
   } catch (e) {
    console.log(e);
    return [];
   }
  },
  loginUser: async (_, args) => {
   const { email, passWord } = args;
   try {
    let cilper = crypto.createHash("sha512");

    cilper.update(passWord);
    const encPassword = cilper.digest("hex");
    const result = await User.findOne({ email, passWord: encPassword });

    console.log(result);

    return { isLogin: true, userData: result };
   } catch (e) {
    console.log(e);
    return { userData: {}, isLogin: false };
   }
  },
  getUser: async (_, args) => {
   const { id } = args;
   try {
    const result = await User.findOne({ _id: id });

    return result;
   } catch (e) {
    console.log(e);
    return;
   }
  },
 },
 Mutation: {
  createUser: async (_, args) => {
   const { name, nickName, affiliatedCompany, passWord, email } = args;
   const current = await CURRENT_TIME();
   try {
    let cilper = crypto.createHash("sha512");

    console.log(cilper);

    cilper.update(passWord);
    const encPassWord = cilper.digest("hex");
    const result = await User.create({
     name,
     nickName,
     passWord: encPassWord,
     email,
     basket: [],
     createdAt: current,
     isDelete: false,
     review: [],
     affiliatedCompany,
    });

    console.log(result);

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
  updateUser: async (_, args) => {
   const { id, name, nickName, affiliatedCompany } = args;

   try {
    const result = await User.updateOne(
     { _id: id },
     { $set: { name, nickName, affiliatedCompany } },
    );

    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },

  deleteUser: async (_, args) => {
   const { id } = args;

   try {
    const result = await User.deleteOne({ _id: id });
    return true;
   } catch (e) {
    console.log(e);
    return false;
   }
  },
 },
};
