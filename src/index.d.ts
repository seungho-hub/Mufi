import { Request } from "express"
import { SessionData } from "express-session"
declare global {
    namespace Express {
        interface Request {
            user: any,
        }
    }
}

declare module 'express-session' {
    export interface SessionData {
        user: { [key: string]: any };
    }
}
