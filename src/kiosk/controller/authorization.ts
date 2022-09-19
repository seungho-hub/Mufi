import { Router, Request, Response } from "express"
import Sin from "../../api/models/Sin"
import md5 from "md5"

export const storeAuthorization = async (req: Request, res: Response) => {
    const inputedSin = req.body.sin

    //sin value is empty
    if (inputedSin) {
        res.status(400).json({
            code: 400,
            message: "sin이 입력되지 않았습니다."
        })

        return
    }

    const encrypted_sin = md5(inputedSin)

    Sin.findOne({
        where: {
            encrypted_sin,
        }
    })
        .then((matched_sin) => {
            req.session.kiosk = matched_sin

            res.status(200).json(req.session.kiosk)
        })
        .catch((err) => {
            if (err) {
                res.status(500).json({
                    code: 500,
                    message: "sin을 확인하는 도중에 알 수 없는 문제가 발생했습니다."
                })
            }
        })
}
