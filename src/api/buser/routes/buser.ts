import { Router } from "express"
import { getSelf } from "../controller/buser"
import { checkStoreAuthroize } from "../middlewares/store"
export const buserRouter = Router()

buserRouter.get("/self", getSelf)





