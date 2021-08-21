import express from 'express'
import jwt from 'jsonwebtoken'
import { error } from '../functions/common.function'
import debug from 'debug'
import { decodedUser } from '../../users/types/users.types'

const log: debug.IDebugger = debug('app:common-middleware')

class CommonMiddleware {

    authUserToken = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const token = req.headers.authorization?.split(' ')[1]
            if (!token) {
                throw new Error(`No token provided`)
            }
            const decodedData: decodedUser = jwt.verify(
                token,
                process.env.JWT_TOKEN
            )
            req.decodedUser = decodedData
            next()
        } catch (e) {
            error(e, req, res, 401)
        }
    }
}

export default new CommonMiddleware()
