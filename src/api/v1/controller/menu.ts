import { Request, Response } from "express"

//menu id will ne provided with query string
export function getMenu(req: Request, res: Response) {
    //get menu

    //response with menu
}

export function createMenu(req: Request, res: Response) {
    console.log(req.body)
    console.log(req)
}