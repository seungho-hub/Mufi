import { Router } from "express"
import { renderHome } from "../controller/home"
export const userHomeRouter = Router()

userHomeRouter.get("/", renderHome)