const express = require("express")

const flash = require('connect-flash');

const app = express()


require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const session = require('express-session')

app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false}))

const postsRouter = require('./routes/posts.router')
const authRouter = require('./routes/auth.router')


//app.use("/api/v1/posts", postsRouter)

app.use(flash());

app.use("/gui/v1/posts", postsRouter)
app.use("/api/v1/auth", authRouter)



app.use("/views", express.static(__dirname + "/views/sass"));


app.set('view engine', 'ejs')




const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})
