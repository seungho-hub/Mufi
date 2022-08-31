import express from "express"
import { menu } from "./api/v1/routes/menu"
import { auth } from "./api/auth/auth"
import path from "path"
import session from "express-session"
import dbConfig from "./api/config/DBConfig"
import createSessionConfig from "./api/config/SessionConfig"
import { sequelize } from "./api/v1/models/index"
const MySQLStore = require("express-mysql-session")(session)
import { isAuthenticated } from "./api/auth/middleware"


export const app = express()

//set port number
app.set("port", process.env.PORT || 8000)

//set view engine 'ejs'
app.set("view engine", "ejs");

//set views folder for view engine
app.set("views", path.join(__dirname, "../views"));

//static serving
app.use(express.static(path.join(__dirname, "../public")));

//enable body parser
app.use(express.urlencoded({ extended: true }))


const sessionStore = new MySQLStore(dbConfig)
app.use(session(createSessionConfig(sessionStore)))

app.use(isAuthenticated)

app.get("/", (req, res) => {
    if (req.session.user) {
        res.render("home", req.session.user)
        return
    }
    res.redirect("/auth/signin")
})

app.use("/api/v1/menu", menu)
app.use("/auth", auth)



