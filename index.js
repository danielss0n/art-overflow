const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const conn = require('./db/conn')

// template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static("public"));

// import routes
const usersRoute = require('./routes/usersRoutes')
const homeRoute = require('./routes/homeRoutes')

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


app.use('/', homeRoute)
app.use('/users', usersRoute)


app.listen(3000)