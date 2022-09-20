const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

require('dotenv').config()

const flash = require('express-flash')
const app = express()

const conn = require('./db/conn')

const User = require('./models/User')
const Post = require('./models/Post')

// template engine
app.engine('handlebars', exphbs.engine({
}))
app.set('view engine', 'handlebars')

app.use(express.static("public"));

// import routes
const authRoutes = require('./routes/authRoutes')
const postsRoutes = require('./routes/postsRoutes')
const usersRoutes = require('./routes/usersRoutes')
//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(),'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

app.use((req, res, next) => {

    if(req.session.userid) {
        res.locals.session = req.session
    }

    next()
    }
)
app.use(flash())


app.use('/posts', postsRoutes)
app.use('/', authRoutes)
app.use('/users', usersRoutes)



conn
  //.sync({ force: true})
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));