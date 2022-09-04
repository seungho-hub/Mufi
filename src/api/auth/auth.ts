import { Router } from "express"
import { renderSignin, renderSignup, signin, signup, signout } from "./controller"
export const authUser = Router()

authUser.get("/signin", renderSignin)

authUser.post("/signin", signin)

authUser.get("/signup", renderSignup)

authUser.post("/signup", signup)

authUser.delete('/signout', signout)