import { Park } from "../database/model.js";

const handlerFunctions = {
  getAllParks: async (req, res) => {
    const allParks = await Park.findAll();
    res.send(allParks);
  },
};

export default handlerFunctions;
