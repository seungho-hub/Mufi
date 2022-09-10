import { Router } from "express"
import * as menuController from "../controller/menu"
import { getMenu, createMenu, deleteMenu } from "../controller/menu"
import { checkStoreAuthroize } from "../middlewares/store"
export const menuRouter = Router()

menuRouter.use(checkStoreAuthroize)
menuRouter.get("/", getMenu)

menuRouter.post("/", createMenu)

menuRouter.delete("/", deleteMenu)




