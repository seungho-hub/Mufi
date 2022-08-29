import express from "express"
import { menu } from "./api/v1/routes/menu"
import { auth } from "./api/auth/auth"
import path from "path"

export const app = express()

app.set("port", process.env.PORT || 8000)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.redirect("/auth/signin")
})

app.use("/api/v1/menu", menu)
app.use("/auth", auth)



