import { Request, Response } from "express"
import Order from "../../models/Order"

export async function getOrder(req: Request, res: Response) {

    const targetOrderId = req.query.order_id
    const targetStoreId = req.query.store_id

    // store_id만 지정되고, order_id는 지정되지 않은 경우
    // target store의 모든 order 기록을 가져온다.
    if (targetOrderId) {
        const orders = Order.findOne({
            where: {
                store_id: targetStoreId
            }
        })

        if (orders == null) {
            res.status(404).json({
                code: 404,
                message: "해당 store에 기록된"
            })
        }

    }
    // store_id, order_id가 모두 지정된경우
    // target store의 target order를 가져온다.
    else {
        const targetOrder = Order.findAll({
            where: {
                id: targetOrderId,
                store_id: targetStoreId,
            }
        })

        if (targetOrder == null) {
            res.status(404).json({
                code: 404,
                message: "해당 id와 일치하는 주문내역을 찾을 수 없습니다."
            })

            return
        }

        res.status(200).json({
            code: 200,
            data: targetOrder,
        })
    }
}
