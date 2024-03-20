import { User, Park, Comment, Post } from "../database/model.js";

const handlerFunctions = {
  getAllParks: async (req, res) => {
    const allParks = await Park.findAll();
  },
};

export default handlerFunctions;
