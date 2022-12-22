import { Request, Response } from "express"
import BUser from "../../models/BUser";

export async function getSelf(req: Request, res: Response) {
    const self = await BUser.findOne({
        where: {
            id: req.session.buser.id
        }
    })


    if (self == null) {
        res.status(404).json({
            code: 404,
            message: "당신의 정보를 가져오는 실패했습니다."
        })

        return
    }

    res.status(200).json({
        code: 200,
        data: self,
    })

    return

}