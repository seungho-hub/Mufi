import { Request, Response } from "express"
import User from "../models/User"
import Store from "../models/BUser"


export async function renderHome(req: Request, res: Response) {
    const store = await Store.findOne({
        where: {
            id: req.session.user.store_id
        }
    })
    res.render("home", ({ user: req.session.user, store }))
}