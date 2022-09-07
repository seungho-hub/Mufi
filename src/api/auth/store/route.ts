import { Router } from "express"
import { renderSignin, renderSignup, signin, signup, signout } from "./controller"

//"/auth/store/"
export const authStore = Router()

authStore.get("/signin", renderSignin)

authStore.post("/signin", signin)

authStore.get("/signup", renderSignup)

authStore.post("/signup", signup)

authStore.delete('/signout', signout)