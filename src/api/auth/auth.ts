import { Router } from "express"
import { renderSignin, renderSignup, signin, signup } from "./controller"
export const auth = Router()

auth.get("/signin", renderSignin)

auth.post("/signin", signin)

auth.get("/signup", renderSignup)

auth.post("/signup", signup)