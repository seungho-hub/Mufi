import { Request, Response } from "express"
import User from "../models/User"
import Store from "../models/BUser"


export async function renderHome(req: Request, res: Response) {
    res.render("buser/home")
}