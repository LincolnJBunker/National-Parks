import {
  User,
  Park,
  Comment,
  Post,
  Activity,
  Follow,
} from "../database/model.js";
import { Op } from "sequelize";

const handlerFunctions = {
  getAllParks: async (req, res) => {
    const allParks = await Park.findAll({
      include: {
        model: Activity,
      },
    });
    res.send(allParks);
  },

  getOnePark: async (req, res) => {
    // const { parkId } = req.params
    const park = await Park.findByPk(req.params.parkId, {
      include: {
        model: Activity,
        model: Post,
      },
    });

    res.send(park);
  },

  getAllActivities: async (req, res) => {
    const allActivities = await Activity.findAll();
    res.send(allActivities);
  },

  sessionCheck: async (req, res) => {
    if (req.session.userId) {
      console.log('Session check truer')
      res.send({
        message: "user is still logged in",
        success: true,
        userId: req.session.userId,
        username: req.session.username,
        password: req.session.password,
        bio: req.session.bio,
        userPic: req.session.userPic
      })
      return
    } else {
      console.log('Session check false')
      res.send({
        message: "no user logged in",
        success: false,
      })
      return
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({
      where: {
        username: username,
      },
    })
    //if no user is found
    if (!user) {
      res.send({
        message: "no user found",
        success: false,
      })
      return
    }
    if (user.password !== password) {
      res.send({
        message: "password does not match",
        success: false,
      })
      return
    }
    req.session.userId = user.userId;
    req.session.username = user.username;
    req.session.password = user.password;
    req.session.bio = user.bio;
    req.session.userPic = user.userPic

    res.send({
      message: "user logged in",
      success: true,
      userId: req.session.userId,
      username: req.session.username,
      password: req.session.password,
      bio: req.session.bio,
      userPic: req.session.userPic
    });
  },

  logout: async (req, res) => {
    req.session.destroy();

    res.send({
      message: "user logged out",
      success: true,
    });
    return;
  },

  createAccount: async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    const newUser = await User.create({
      username,
      email,
      password,
    });
    req.session.userId = newUser.userId;
    req.session.username = newUser.username;
    req.session.password = newUser.password;
    req.session.bio = newUser.bio;
    req.session.userPic = newUser.userPic

    res.send({
      message: "user logged in",
      success: true,
      userId: req.session.userId,
      username: req.session.username,
      password: req.session.password,
      bio: req.session.bio,
      userPic: req.session.userPic
    });
  },


    getPosts: (req, res) => {   // set req.body.mode to 'park', 'friends', or 'user' to get posts filtered for that use case
        console.log('getPosts', req.body)
        if (typeof req.body.myId!=='number') {
            res.send({message: 'No id provided', success: false})
            return
        }
        switch (req.body.mode) {
            case 'park':        // get posts of a park
                Park.findByPk(req.body.myId, {
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
                                model: User,
                                attributes: ['userId', 'username'],
                            },
                            {
                                model: Park,
                                attributes: ['parkId', 'fullName'],
                            },
                            {
                                model: Activity,
                            },
                        ]
                    }],
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
                User.findByPk(req.body.myId, {
                    include: [{
                        model: Post,
                        include: [{
                            model: Comment,     // Include comments associated with each post
                            order: [['createdAt', 'DESC']],
                            include: [{
                                model: User,
                                attributes: ['userId', 'username'],
                            }]
                            },
                            {
                                model: User,
                                attributes: ['userId', 'username'],
                            },
                            {
                                model: Park,
                                attributes: ['parkId', 'fullName'],
                            },
                            {
                                model: Activity,
                            },
                        ]
                    }],
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
                console.log('friends')
                Follow.findAll({
                    where: {
                        followerId: req.body.myId,
                    }
                })
                .then(follows => {
                    User.findAll({
                        where: {userId: { [Op.in]: follows.map(follow => follow.followedId)}},
                        include: [{
                            model: Post,
                            include: [
                                {
                                    model: Comment,     // Include comments associated with each post
                                    order: [['createdAt', 'DESC']],
                                    include: [{
                                        model: User,
                                        attributes: ['userId', 'username'],}]
                                },
                                {
                                    model: User,
                                    attributes: ['userId', 'username'],
                                },
                                {
                                    model: Park,
                                    attributes: ['parkId', 'fullName'],
                                },
                                {
                                    model: Activity,
                                },
                            ]
                        }],
                    }
                )
                .then((users) => {
                    const posts = users.reduce((acc, user) => {
                        return acc.concat(user.posts);
                    }, []).sort((a,b) => b.createdAt - a.createdAt);
                    res.send({
                        message: 'Here are all the posts with comments',
                        success: true,
                        posts,
                    })
                }).catch((err) => {
                    console.error(err)
                    res.send({
                        message: 'Error fetching posts',
                        success: false,
                    })
                })
            })
        }
    },      
     
        userInfo: async (req, res) => {
            const { userId } = req.body
            console.log('Recieved userId:', userId)
            try {
                const user = await User.findByPk(userId.userId, {
                    attributes: ['userId', 'username', 'password', 'bio', 'userPic'],
                });
                console.log('Retrieved user:', user);
                
                res.send(user);
            } catch (error) {
                console.error('Error retrieving user:', error);
                res.status(500).send('Internal Server Error');
            }
    },
        updateUser: async (req, res) => {
          const {
            username,
            password,
            bio,
            userPic
          } = req.body
          console.log(req.body)

          const user = await User.findByPk(req.params.id);

          await user.update({
            username: username ?? user.username,
            password: password ?? user.password,
            bio: bio ?? user.bio,
            userPic: userPic ?? user.userPic
          })

          res.send({
            message: 'user updated',
            user: user
          })

    },

        deleteUser: async (req,res) => {
            console.log(req.params)
            
            const userToDelete = await User.findByPk(req.params.userId)
            await userToDelete.destroy();

            res.send({
                message: "user deleted successfully",
                status: true
            })
    },

    parkMarkers: async (req, res) => {
      const allMarkers = await Park.findAll({
          attributes: ['parkId', 'fullName', 'latitude', 'longitude'],
          attributes: ['parkId', 'fullName', 'latitude', 'longitude', 'images'],
          include: [{
              model: Activity,
              through: {
                  attributes: ['activity_activity_id']
              }
          }]
      })
      res.send(allMarkers)
      // res.send(allActivities)
  }
};

export default handlerFunctions;
