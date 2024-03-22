import { User, Park, Comment, Post, Follow } from "../database/model.js";
import { Op } from "sequelize";



await User.findByPk(1, {
    include: Post // Include the associated posts
}).then(user => {
    console.log(user)
    for (let post of user.posts) {
        console.log(post)
    }
})