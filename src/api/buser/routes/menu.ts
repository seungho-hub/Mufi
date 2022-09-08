import { Router } from "express"
import * as menuController from "../controller/Menu"
import { getMenu, createMenu, deleteMenu } from "../controller/Menu"

export const menuRouter = Router()

menuRouter.get("/", getMenu)

menuRouter.post("/", createMenu)

menuRouter.delete("/", deleteMenu)




