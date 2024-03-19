import { Park, User, Post, Comment, Activity, Message, Follow } from '../database/model.js'



const handlerFunctions = {
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
}





export default handlerFunctions