import { Router } from "express"
import { createStore, getStore, deleteStore, updateStore, getOrderOfStore } from "../controller/store"
import { checkStoreAuthroize } from "../middlewares/store"
//"api/buser/store"
export const storeRouter = Router()

//
storeRouter.use(checkStoreAuthroize.unless({
    method: ["GET", "POST"]
}))
storeRouter.get("/", getStore)
storeRouter.post("/", createStore)
storeRouter.put("/", updateStore)
storeRouter.delete("/", deleteStore)

storeRouter.get("/order", getOrderOfStore)