import express from "express"
//import routers

//user router
import { authUser } from "./api/auth/user/route"

//buser router
import { menuRouter } from "./api/buser/routes/menu"
import { authBUser } from "./api/auth/buser/route"
import { bUserRouter } from "./api/buser/routes"
import { storeRouter } from "./api/buser/routes/store"

import { userHomeRouter } from "./api/user/routes/home"

import path from "path"
import session from "express-session"
import dbConfig from "./api/config/DBConfig"
import createSessionConfig from "./api/config/SessionConfig"
const MySQLStore = require("express-mysql-session")(session)
import { bUserAuthenticated } from "./api/auth/bUser/middleware"
import { userAuthenticated } from "./api/auth/user/middleware"
import fileupload from "express-fileupload"

export const app = express()

//set port number
app.set("port", process.env.PORT || 80)

//set view engine 'ejs'
app.set("view engine", "ejs");

//set views folder for view engine
app.set("views", path.join(__dirname, "../views", "templates"))

//static serving
app.use(express.static(path.join(__dirname, "../views", "statics")))
app.use(express.static(path.join(process.env.PWD, "media")))

//enable body parser
app.use(express.urlencoded({ extended: true }))

app.use(fileupload({}))
const sessionStore = new MySQLStore(dbConfig)

app.use(session(createSessionConfig(sessionStore)))


//--------------------------------------
//user routing
app.use("/user/", userAuthenticated)
//for api
app.use("/api/user", userAuthenticated)

app.use("/auth/user", authUser)
app.use("/user/", userHomeRouter)





//buser routing

//for home
app.use("/buser", bUserAuthenticated)
//for api
app.use("/api/buser", bUserAuthenticated)
app.use("/auth/buser", authBUser)
app.use("/buser", bUserRouter)

app.use("/api/buser/menu", menuRouter)
app.use("/api/buser/store", storeRouter)




