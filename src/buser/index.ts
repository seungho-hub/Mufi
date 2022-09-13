import { Request, Response } from "express"

export async function renderHome(req: Request, res: Response) {
    res.render("buser/main/home")
}

export async function renderMenu(req: Request, res: Response) {
    res.render("buser/menu/menu")
}

export async function renderStore(req: Request, res: Response) {
    res.render("buser/store/store")
}