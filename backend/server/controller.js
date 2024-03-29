import {
  User,
  Park,
  Comment,
  Post,
  Activity,
  Follow,
  Inbox,
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
      include: [
        { model: Activity },
        {
          model: Post,
          include: [
            { model: User },
            { model: Comment, include: { model: User } },
            { model: Activity },
          ],
        },
      ],
    });

    res.send(park);
  },

  getAllActivities: async (req, res) => {
    const allActivities = await Activity.findAll();
    res.send(allActivities);
  },

  //   getParkActivity: async (req, res) => {
  //     const parkActivity = await Activity.findAll({
  //       where: {},
  //     });
  //   },

  sessionCheck: async (req, res) => {
    if (req.session.userId) {
      console.log("Session check truer");
      res.send({
        message: "user is still logged in",
        success: true,
        userId: req.session.userId,
        username: req.session.username,
        password: req.session.password,
        bio: req.session.bio,
        userPic: req.session.userPic,
      });
      return;
    } else {
      console.log("Session check false");
      res.send({
        message: "no user logged in",
        success: false,
      });
      return;
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    //if no user is found
    if (!user) {
      res.send({
        message: "no user found",
        success: false,
      });
      return;
    }
    if (user.password !== password) {
      res.send({
        message: "password does not match",
        success: false,
      });
      return;
    }
    req.session.userId = user.userId;
    req.session.username = user.username;
    req.session.password = user.password;
    req.session.bio = user.bio;
    req.session.userPic = user.userPic;

    res.send({
      message: "user logged in",
      success: true,
      userId: req.session.userId,
      username: req.session.username,
      password: req.session.password,
      bio: req.session.bio,
      userPic: req.session.userPic,
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
    req.session.userPic = newUser.userPic;

    res.send({
      message: "user logged in",
      success: true,
      userId: req.session.userId,
      username: req.session.username,
      password: req.session.password,
      bio: req.session.bio,
      userPic: req.session.userPic,
    });
  },

  getPosts: (req, res) => {
    console.log('getPosts called with req.body = ', req.body)
    // set req.body.mode to 'park', 'friends', or 'user' to get posts filtered for that use case
    // console.log("getPosts", req.body);
    if (typeof req.body.myId !== "number") {
      res.send({ message: "No id provided", success: false });
      return;
    }
    switch (req.body.mode) {
      case "park": // get posts of a park
        Park.findByPk(req.body.myId, {
          include: [
            {
              model: Post,
              include: [
                {
                  model: Comment, // Include comments associated with each post
                  order: [["createdAt", "DESC"]],
                  include: [
                    {
                      model: User,
                      attributes: ["userId", "username"],
                    },
                  ],
                },
                {
                  model: User,
                  attributes: ["userId", "username"],
                },
                {
                  model: Park,
                  attributes: ["parkId", "fullName"],
                },
                {
                  model: Activity,
                },
              ],
            },
          ],
        })
          .then(({ posts }) => {
            res.send({
              posts,
              message: "Here are the park's posts with comments",
              success: true,
            });
          })
          .catch((err) => {
            console.error(err);
            res.send({
              message: "Error fetching posts",
              success: false,
            });
          });
        return;
      case "user": // get post of a user
        User.findByPk(req.body.myId, {
          include: [
            {
              model: Post,
              include: [
                {
                  model: Comment, // Include comments associated with each post
                  order: [["createdAt", "DESC"]],
                  include: [
                    {
                      model: User,
                      attributes: ["userId", "username"],
                    },
                  ],
                },
                {
                  model: User,
                  attributes: ["userId", "username"],
                },
                {
                  model: Park,
                  attributes: ["parkId", "fullName"],
                },
                {
                  model: Activity,
                },
              ],
            },
          ],
        })
          .then(({ posts }) => {
            res.send({
              posts,
              message: "Here are the user's posts with comments",
              success: true,
            });
          })
          .catch((err) => {
            console.error(err);
            res.send({
              message: "Error fetching posts",
              success: false,
            });
          });
        return;
      case "friends": // get posts of friends
        // console.log("friends");

        User.findByPk(req.body.myId, {
          include: {
            model: User,
            as: 'Following',
            through: {where: {isFollowing: true}},
            include: [
              {
                model: Post,
                include: [
                  {
                    model: Comment, // Include comments associated with each post
                    order: [["createdAt", "DESC"]],
                    include: [
                      {
                        model: User,
                        attributes: ["userId", "username"],
                      },
                    ],
                  },
                  {
                    model: User,
                    attributes: ["userId", "username"],
                  },
                  {
                    model: Park,
                    attributes: ["parkId", "fullName"],
                  },
                  {
                    model: Activity,
                  },
                ],
              },
            ],
          }
        }).then((user) => {
          console.log(user)
          const posts = user.Following
            .reduce((acc, user) => {
              return acc.concat(user.posts);
            }, [])
            .sort((a, b) => b.createdAt - a.createdAt);
          res.send({
            message: "Here are all the posts with comments",
            success: true,
            posts,
          })
        }).catch((err) => {
          console.error(err);
          res.send({
            message: "Error fetching posts",
            success: false,
          });
        })




        // Follow.findAll({
        //   where: {
        //     followerId: req.body.myId,
        //   },
        // })
        //   .then((follows) => {
        //     User.findAll({
        //       where: {
        //         userId: {
        //           [Op.in]: [
        //             ...follows.map((follow) => follow.followedId),
        //             req.body.myId,
        //           ],
        //         },
        //       },
        //       include: [
        //         {
        //           model: Post,
        //           include: [
        //             {
        //               model: Comment, // Include comments associated with each post
        //               order: [["createdAt", "DESC"]],
        //               include: [
        //                 {
        //                   model: User,
        //                   attributes: ["userId", "username"],
        //                 },
        //               ],
        //             },
        //             {
        //               model: User,
        //               attributes: ["userId", "username"],
        //             },
        //             {
        //               model: Park,
        //               attributes: ["parkId", "fullName"],
        //             },
        //             {
        //               model: Activity,
        //             },
        //           ],
        //         },
        //       ],
        //     }).then((users) => {
        //       const posts = users
        //         .reduce((acc, user) => {
        //           return acc.concat(user.posts);
        //         }, [])
        //         .sort((a, b) => b.createdAt - a.createdAt);
        //       res.send({
        //         message: "Here are all the posts with comments",
        //         success: true,
        //         posts,
        //       });
        //     });
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //     res.send({
        //       message: "Error fetching posts",
        //       success: false,
        //     });
        //   });
    }
    return;
  },

  postComment: (req, res) => {
    // console.log(req.body);
    Comment.create({
      commentText: req.body.commentText,
      postId: req.body.postId,
      userId: req.body.userId,
    })
      .then((comment) => {
        res.send({
          message: "Comment successfully created",
          success: true,
          comment: comment,
        });
      })
      .catch((err) => {
        res.send({
          message: "There was an error posting your comment",
          success: false,
        });
        console.error(err);
      })
      .catch((err) => {
        res.send({
          message: "There was an error posting your comment",
          success: false,
        });
        console.error(err);
      });
  },

  userInfo: async (req, res) => {
    const { userId } = req.body;
    // console.log("Recieved userId:", userId);
    try {
      const user = await User.findByPk(userId.userId, {
        attributes: ["userId", "username", "password", "bio", "userPic"],
      });
      // console.log("Retrieved user:", user);

      res.send(user);
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  
        userInfo: async (req, res) => {
            // const { userId } = req.body
            // console.log('Recieved userId:', req.body.id)
            try {
                const user = await User.findByPk(req.body.id, {
                    attributes: ['userId', 'username', 'password', 'bio', 'userPic'],
                });
                // console.log('Retrieved user:', user);
                
                res.send(user);
            } catch (error) {
                console.error('Error retrieving user:', error);
                res.status(500).send('Internal Server Error');
            }
    },

  updateUser: async (req, res) => {
    const { username, password, bio, userPic } = req.body;
    // console.log(req.body);

    const user = await User.findByPk(req.params.id);

    await user.update({
      username: username ?? user.username,
      password: password ?? user.password,
      bio: bio ?? user.bio,
      userPic: userPic ?? user.userPic,
    });

    res.send({
      message: "user updated",
      user: user,
    });
  },

  deleteUser: async (req, res) => {
    console.log(req.params);

    const userToDelete = await User.findByPk(req.params.userId);
    await userToDelete.destroy();

    res.send({
      message: "user deleted successfully",
      status: true,
    });
  },

  parkMarkers: async (req, res) => {
    const allMarkers = await Park.findAll({
      attributes: ["parkId", "fullName", "latitude", "longitude"],
      attributes: ["parkId", "fullName", "latitude", "longitude", "images"],
      include: [
        {
          model: Activity,
          through: {
            attributes: ["activity_activity_id"],
          },
        },
      ],
    });
    res.send(allMarkers);
    // res.send(allActivities)
  },
  deletePost: async (req, res) => {
    const postId = req.params.postId;
    console.log(req.params);
    await Post.destroy({ where: { postId: postId } });

    let posts = await Post.findAll();
    res.send({ message: "Post deleted", allPosts: posts });
  },

  getOneUser: async (req, res) => {
    const profile = User.findByPk(req.params.userId);
    res.send(profile);
  },
  addPost: async (req, res) => {
    const pPic = req.body.postPic;
    const pText = req.body.postText;
    const pPark = req.body.parkId;
    const pPicTwo = req.body.secondPic;
    const pPicThree = req.body.thirdPic;
    const pActivity = req.body.activityId;

    const newPost = {
      postPic: pPic,
      secondPic: pPicTwo,
      thirdPic: pPicThree,
      postText: pText,
      parkId: pPark,
      activityId: pActivity,
    };

    let foundUser = await User.findByPk(req.session.userId);
    let addedPost = await foundUser.createPost(newPost);

    res.send({
      message: "Here's a new post!",
      newPost: addedPost,
    });
  },

  getOneUser: async (req, res) => {
    const profile = User.findByPk(req.params.userId);
    res.send(profile);
  },

  getFollows: async (req, res) => {
    console.log('getFollows called with id: ', req.params.id)
    try {
      const followingPromise = User.findByPk(req.params.id, {
        include: {
          model: User,
          as: 'Following',
          through: {where: {isFollowing: true}},
          attributes: ['userId', 'username', 'userPic']
        }
      })
      const followersPromise = User.findByPk(req.params.id, {
        include: {
          model: User,
          as: 'Followers',
          through: {where: {isFollowing: true}},
          attributes: ['userId', 'username', 'userPic']
        }
      })
      const [following, followers] = await Promise.all([
        followingPromise,
        followersPromise
      ])
      let followingArr = following.Following.map(f => {return {username: f.username, userId: f.userId}})
      let followersArr = followers.Followers.map(f => {return {username: f.username, userId: f.userId}})
      res.send({
        message: "Here are the follows",
        success: true,
        following: followingArr,
        followers: followersArr,
      });
    } catch (err) {
      console.error(err);
      res.send({ message: "Error fetching follows", success: false });
    } finally {
      return;
    }
  },

  followUser: (req, res) => {
    Follow.findOne({
      where: { follower: req.body.userId, following: req.body.profileId },
    })
      .then((follow) => {
        if (!follow) {
          Follow.create({
            follower: req.body.userId,
            following: req.body.profileId,
          }).then(() => {
            res.send({ message: "Successfully followed", success: true });
            return;
          });
        } else {
          follow.isFollowing = true;
          follow.save().then(() => {
            res.send({ message: "Successfully followed", success: true });
          });
        }
      })
      .catch((err) => {
        console.error(err);
        res.send({ message: "Error following user", success: false });
      });
  },

  unfollowUser: (req, res) => {
    Follow.findOne({
      where: { follower: req.body.userId, following: req.body.profileId },
    })
      .then((follow) => {
        if (!follow) {
          res.send({ message: "Error: no follow was found", success: false });
          return;
        } else {
          follow.isFollowing = false;
          follow.save().then(() => {
            res.send({ message: "Unfollow was successful", success: true });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.send({
          message: "Error while attempting to unfollow",
          success: false,
        });
      });
    return;
  },

  newInbox: async (req, res) => {
    const { name, email, message } = req.body
    const newInboxMessage = await Inbox.create({
      name,
      email,
      message
    });
    res.send({
      message: "Message recieved",
      status: true,
      newInboxMessage: newInboxMessage
    })
  },
};

export default handlerFunctions;
