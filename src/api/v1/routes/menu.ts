import { Router } from "express"
import * as menuController from "../controller/menu"
export const menu = Router()

menu.get("/", menuController.renderMenu)




