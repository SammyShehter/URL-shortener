import express from 'express'
import { validationResult } from 'express-validator'
import { error } from '../functions/common.function'
import debug from 'debug'

const log: debug.IDebugger = debug('app:common-middleware')

class CommonMiddleware {

    validatorErrors = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json(errors)
            } else {
                next()
            }
        } catch (e) {
            error(e, req, res)
        }
    }
}

export default new CommonMiddleware()
