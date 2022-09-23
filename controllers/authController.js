const User = require('../models/User')
const bcrypt = require('bcrypt')
const {sessionRedirect} = require('../helpers/session-redirect')


module.exports = class authController {
    static registerPage(req, res) {
        res.render('auth/register')
    }

    static loginPage(req, res) {
        res.render('auth/login')
    }

    static async register(req, res) {
        const {name, email, password, passwordConfirm} = req.body
        const checkIfUserExists = await User.findOne({where: {email: email}})
        

        function showMessage(msg) {
            req.flash('message', msg)
            res.render('auth/register')
        }

        if(checkIfUserExists){

            req.flash('message', 'O email já está cadastrado')
            res.render('auth/register')

            return
        }


        const saltRounds = 10;
        
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
        const { email, password } = req.body

        //find user 
        const user = await User.findOne({where: {email: email}})
        
        if(!user) {
            req.flash('message', 'Usuario não encontrado')
            res.render('auth/login')

            return
        }
        console.log(user.password)
        const passwordMatch = bcrypt.compareSync(password, user.password)



        if(!passwordMatch) {
            req.flash('message', 'senha erada kkk' )
            res.render('auth/login')

            return
        } else {
            req.flash('message', 'parabens' )

            req.session.userid = user.id

            sessionRedirect(req, res, '/posts')
        }
        //check password
        
    }   

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}