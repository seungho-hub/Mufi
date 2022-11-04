import { Router } from "express"
import { getPayments } from "../controller/Payment"
export const PaymentRouter = Router()

// "/api/user/payment"
PaymentRouter.get("/", getPayments)