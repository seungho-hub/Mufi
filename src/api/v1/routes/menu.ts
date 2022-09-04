import { Router } from "express"
import * as menuController from "../controller/menu"
import { getMenu, createMenu, deleteMenu } from "../controller/menu"

export const menu = Router()

menu.get("/", getMenu)

menu.post("/", createMenu)

menu.delete("/", deleteMenu)




