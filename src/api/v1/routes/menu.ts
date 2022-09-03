import { Router } from "express"
import * as menuController from "../controller/menu"
import {getMenu, createMenu} from "../controller/menu"

export const menu = Router()

menu.get("/", getMenu)

menu.post("/", createMenu)




