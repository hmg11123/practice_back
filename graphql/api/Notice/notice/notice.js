import Notice from "../../../model/Notice";

export default {
 Query: {
  getAllNotice: async (_, args) => {
   const { searchValue, limit, currentPage } = args;

   try {
    const result = await Notice.find({}, {})
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
 },
};
