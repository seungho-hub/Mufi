import { Router } from "express"
import { getOrder } from "../controller/order"
import { checkStoreAuthroize } from "../middlewares/store"

export const storeOrderRouter = Router()

storeOrderRouter.use(checkStoreAuthroize)

storeOrderRouter.get("/", getOrder)
