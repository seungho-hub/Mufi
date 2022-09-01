import { Router } from "express"
export const menu = Router()
import { getMenu, createMenu } from "../controller/menu"

//menu router will be bounded at "/api/v1/menu"
// GET "/api/v1/menu"
menu.get("/")

// POST "/api/v1/menu"
menu.post("/", createMenu)






