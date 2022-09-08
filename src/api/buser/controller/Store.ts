import { Request, Response } from "express"
import { UploadedFile } from "express-fileupload";
import Menu from "../models/Menu";
import path from "path"
import mime from "mime-types"
import { v4 } from "uuid"
import Store from "../models/Store"
import { ValidationError, QueryError, where } from 'sequelize';


export async function createStore(req: Request, res: Response) {
    //name, description, zip_code, detail_address
    const { code, name, description, zip_code, detail_address } = req.body
    const buser_id = req.session.buser.id

    const registered_store = await Store.findOne({ where: { code: code } })

    //등록된 code가 아닌 경우
    if (registered_store == null) {
        res.status(400).json({
            code: 400,
            message: "등록된 매장이 아닙니다, Mufi에 문의해주세요."
        })

        return
    }
    Store.update({
        name,
        description,
        zip_code,
        detail_address,
    },
        {
            where: { code },
        })
        .then((updated_store) => {
            res.status(200).json({
                code: 200,
                message: "성공적으로 매장이 등록되었습니다.",
                updated_store
            })

            return
        })
        .catch(err => {
            if (err instanceof ValidationError) {
                res.status(400).json({
                    code: 400,
                    message: "입력 값이 유효하지 않습니다."
                })

                return
            }

            res.status(500).json({
                code: 500,
                message: "알 수 없는 에러가 발생했습니다."
            })

            return
        })
}

export async function getStore(req: Request, res: Response) {

}

export async function deleteStore(req: Request, res: Response) {
}