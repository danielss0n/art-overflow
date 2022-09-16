const User = require('../models/User')
const bcrypt = require('bcrypt')


module.exports = class userController {
    static registerPage(req, res) {
        res.render('users/register')
    }

    static loginPage(req, res) {
        res.render('users/login')
    }

    static async register(req, res) {
        const {name, email, password, passwordConfirm} = req.body
        const verifyUser = await User.findOne({where: {email: email}}).lean()
        

        function showMessage(msg) {
            req.flash('message', msg)
            res.render('users/register')
        }

        const saltRounds = 10;
        
            if ( email == verifyUser.email ) {
                showMessage('Email já cadastrado')
                return
            }
            if (name ==='' || email === '' || password === '' || passwordConfirm === '') {
                showMessage('Preencha todos os campos')
                return
            }
            if (password.length < 6) {
                showMessage('A senha deve ter mais de 6 caracteres')
                return
            } 
            if (!email.includes('@','.')) {
                showMessage('Email invalido')
                return
            }
            if ( password !== passwordConfirm ) {
                showMessage("As senhas não combinam")
                return
            }
                
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
                    
         

            const user = {
                name, 
                email,
                password: hashedPassword
            }

            const createdUser = await User.create(user)

            
            

            req.session.userid = createdUser.id

            req.session.save(() => {
                res.redirect('/posts')
            })
        } 
    

    static async login(req, res) {
        const email = req.body.email
        const password = req.body.password
        const saltRounds = 10;



        const user = await User.findOne({where: {email: email}})
          
        function showMessage(msg) {
            req.flash('message', msg)
            res.render('users/login')
        }
        
        if( email === '' || password ==='') {
            showMessage('Preencha todos os campos')
            return
        } 
        
        const passwordHash = user.password
        const passwordMatch = bcrypt.compareSync(password, passwordHash)

        if (!user) {
            showMessage('Usuário não cadastrado')
            return
        }

        if (!passwordMatch) {
            showMessage('Senha incorreta');
            return
        }
        
    
        req.session.userid = user.id

        req.session.save(() => {
            res.redirect('/posts')
        })
               
        
        
    }   

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/users/login')
    }
}