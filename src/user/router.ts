import { Router } from "express"
import { renderHome } from "./home"
import { tossAPIRouter } from "./routes/toss"
export const userHomeRouter = Router()

userHomeRouter.get("/", renderHome)

userHomeRouter.use(tossAPIRouter)