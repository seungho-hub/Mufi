import { Router } from "express"
import * as menuController from "../controller/menu"
import { getMenu, createMenu, deleteMenu } from "../controller/menu"

export const menuRouter = Router()

menuRouter.get("/", getMenu)

menuRouter.post("/", createMenu)

menuRouter.delete("/", deleteMenu)




