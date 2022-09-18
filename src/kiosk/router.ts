import { Router, Request, Response } from "express"
export const kioskRouter = Router()

kioskRouter.get("/", (req: Request, res: Response) => {
    res.render("kiosk/home")
})