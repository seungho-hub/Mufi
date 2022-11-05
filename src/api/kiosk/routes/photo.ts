import {Router} from "express"
import {createPhoto} from "../controller/photo"

export const photoRouter = Router()

photoRouter.post("/", createPhoto)
