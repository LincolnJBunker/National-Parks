import { User, Park, Comment, Post, Activity } from "../database/model.js";


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

        const user = await User.findOne({
            where: {
                username: username
            }
        })
        //if no user if found
        if(!user) {
            res.send({
                message: 'no user found',
                success: false
            })
            return
        }
        if(user.password !== password) {
            res.send({
                message: 'password does not match',
                success: false
            })
            return
        }
        req.session.userId = user.userId
        req.session.username = user.username

        res.send({
            message: 'user logged in',
            success: true,
            userId: req.session.userId,
            username: req.session.username
        })
    },

    logout: async (req, res) => {
        req.session.destroy()
    
        res.send({
          message: "user logged out",
          success: true
        })
        return
      },

      createAccount: async (req, res) => {
        const { username, email, password } = req.body
        console.log(req.body)
        const newUser = await User.create({
            username,
            email,
            password,
        })
      },

      parkMarkers: async (req, res) => {
        const allMarkers = await Park.findAll({
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
    },
        updateUser: async (req, res) => {
          const {
            username,
            password
          } = req.body

          const user = await User.findByPk(req.params.id);

          await user.update({
            username: username ?? user.username,
            password: password ?? user.password
          })

    },
};

export default handlerFunctions;

