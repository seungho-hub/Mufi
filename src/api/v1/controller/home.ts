import { Request, Response } from "express"

export function renderHome(req: Request, res: Response) {
    res.render("home", ({ user: req.session.user }))
}