import { Router } from "express"
import { createStore, getStore, deleteStore, updateStore } from "../controller/store"

//"api/buser/store"
export const storeRouter = Router()

storeRouter.get("/", getStore)
storeRouter.post("/", createStore)
storeRouter.put("/", updateStore)
storeRouter.delete("/", deleteStore)