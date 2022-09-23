const Post = require('../models/Post')
const User = require('../models/User')

module.exports = class usersController {
    static async showUser(req, res) {
        const name = req.params.name
        

        const user = await User.findOne({where: {name: name},raw: true})
        console.log(user)
        res.render('users/user',  {user} )
    }

    
    
}