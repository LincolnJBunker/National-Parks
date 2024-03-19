import {
  db,
  User,
  Post,
  Park,
  Activity,
  Message,
  Follow,
  Comment,
} from "./model.js";

const allParks = await Park.findAll({ include: Activity });

console.log(allParks);

await db.close();
