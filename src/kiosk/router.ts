import { Router, Request, Response } from "express"
export const kioskRouter = Router()
import AuthorizationRouter from "./routes/authorization"

kioskRouter.get("/", (req: Request, res: Response) => {
    res.render("kiosk/home")
})

kioskRouter.use("/authorization", AuthorizationRouter)
