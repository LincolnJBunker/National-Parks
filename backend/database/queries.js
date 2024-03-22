import { User, Park, Comment, Post, Follow } from "../database/model.js";
import { Op } from "sequelize";



// await User.findByPk(1, {
//     include: Post // Include the associated posts
// }).then(user => {
//     console.log(user)
//     for (let post of user.posts) {
//         console.log(post)
//     }
// })



Follow.findAll({
    where: {
        followerId: 1,
    }
})
.then(follows => {
    User.findAll({
        where: {userId: { [Op.in]: follows.map(follow => follow.followedId)}},
        include: [{
            model: Post,
            include: [{
                model: Comment,     // Include comments associated with each post
                order: [['createdAt', 'DESC']],
                include: [{
                    model: User,     // Include comments associated with each post
                    attributes: ['userId', 'username'],
                }]
            },
            {
                model: User,     // Include comments associated with each post
                attributes: ['userId', 'username'],
            },
        ]
        }],
    })
    .then((users) => {
        // console.log('users', users)
        const posts = users.reduce((acc, user) => {
            return acc.concat(user.posts);
          }, []).sort((a,b) => b.createdAt - a.createdAt);
        console.log(posts)
    }).catch((err) => {
        console.error(err)
    })
})