import { Router } from "express"
import { createStore, getStore, deleteStore } from "../controller/Store"

//"api/buser/store"
export const storeRouter = Router()

storeRouter.get("/", getStore)
storeRouter.post("/", createStore)
storeRouter.delete("/", deleteStore)