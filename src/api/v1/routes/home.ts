import { Router } from "express"
import { renderHome } from "../controller/home"
export const home = Router()

home.get("/", renderHome)