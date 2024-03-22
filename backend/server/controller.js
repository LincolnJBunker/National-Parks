import { User, Park, Comment, Post, Follow } from "../database/model.js";
import { Op } from "sequelize";


const handlerFunctions = {
  getAllParks: async (req, res) => {
    const allParks = await Park.findAll();
    res.send(allParks);
  },
      sessionCheck: async (req, res) => {
        if (req.session.userId) {
            res.send({
                message: 'user is still logged in',
                success: true,
                userId: req.session.userId,
            })
            return
        } else {
            res.send({
                message: 'no user logged in',
                success: false
            })
            return
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        console.log(req.body)
 
    },

    getPosts: (req, res) => {   // set req.body.mode to 'park', 'friends', or 'user' to get posts filtered for that use case
        switch (req.body.mode) {
            case 'park':        // get posts of a park
                Park.findByPk(req.body.id, {
                    include: [
                      {
                        model: Post,
                        order: [['createdAt', 'DESC']],
                        include: [{
                            model: Comment,     // Include comments associated with each post
                            order: [['createdAt', 'DESC']],
                        }]
                      }
                    ]
                  })
                .then(({posts}) => {
                    res.send({
                        posts,
                        message: "Here are the park's posts with comments",
                        success: true
                    })
                }).catch((err) => {
                    console.error(err)
                    res.send({
                        message: 'Error fetching posts',
                        success: false
                    })
                })
                return

            case 'user':        // get post of a user
                User.findByPk(req.body.id, {
                    include: [
                      {
                        model: Post,
                        order: [['createdAt', 'DESC']],
                        include: [{
                            model: Comment,     // Include comments associated with each post
                            order: [['createdAt', 'DESC']],
                        }]
                      }
                    ]
                  })
                .then(({posts}) => {
                    res.send({
                        posts,
                        message: "Here are the user's posts with comments",
                        success: true
                    })
                }).catch((err) => {
                    console.error(err)
                    res.send({
                        message: 'Error fetching posts',
                        success: false
                    })
                })
                
            case 'friends':     // get posts of friends
                Follow.findAll({
                    where: {
                        followerId: req.body.id,
                    }
                })
                .then(userIds => {
                    User.findAll({
                        where: {userId: { [Op.in]: userIds}},
                        include: [{
                            model: Post,
                            include: [{
                                model: Comment,     // Include comments associated with each post
                                order: [['createdAt', 'DESC']],
                            }]
                        }],
                    })
                    .then((users) => {
                        const posts = users.reduce((acc, user) => {
                            return acc.concat(user.posts);
                          }, []).sort((a,b) => b.createdAt - a.createdAt);
                        res.send({
                            posts,
                            message: "Here are friends' posts with comments",
                            success: true
                        })
                    }).catch((err) => {
                        console.error(err)
                        res.send({
                            message: 'Error fetching posts',
                            success: false
                        })
                    })
                })
        }
    }
};

export default handlerFunctions;

