import { Request, Response } from "express"
import User from "../models/User"
import Store from "../models/Store"


export async function renderHome(req: Request, res: Response) {
    console.log(req.session.user.store_id)
    const store = await Store.findOne({
        where: {
            id: req.session.user.store_id
        }
    })
    res.render("home", ({ user: req.session.user, store }))
}