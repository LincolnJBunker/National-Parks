import {
  User,
  Park,
  Comment,
  Post,
  Follow,
  Activity,
  db,
} from "../database/model.js";
import { Op } from "sequelize";

// await User.findByPk(1, {
//     include: Post // Include the associated posts
// }).then(user => {
//     console.log(user)
//     for (let post of user.posts) {
//         console.log(post)
//     }
// })

const park = await Park.findByPk(3, {
  include: [{ model: Activity }, { model: Post }],
});

console.log(park);

console.log(await Park.findByPk(61));

await db.close();
