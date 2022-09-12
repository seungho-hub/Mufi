import { Router } from "express"
import { renderHome } from "../controller/home"
export const homeRouter = Router()

homeRouter.get("/", renderHome)