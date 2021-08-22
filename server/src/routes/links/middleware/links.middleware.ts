import debug from 'debug'
import express from 'express'
import { error } from '../../common/functions/common.function'
import LinkService from '../services/links.service'
import LinkDao from '../daos/links.dao'

const log: debug.IDebugger = debug('app:links-middleware')

export class LinkMiddleware {
    async validateLink(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try {
            if (
                typeof req.params.link !== 'string' ||
                req.params.link.length !== 9
            )
                throw new Error('Recieved non valid link')
            next()
        } catch (e) {
            console.log(e.message)
            return res.redirect(process.env.RICK_URL)
        }
    }

    async validateExpiration(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try {
            const code = req.params.link
            const link = await LinkDao.findLinkByCode(code)
            if(!link)
                throw new Error('Use case of non existing link')
            req.link = link

            const now = Date.now()
            if(now > link.expDate)
                throw new Error('Use case of expired link')

            next()
        } catch (e) {
            console.log(e.message);
            return res.redirect(process.env.RICK_URL)
        }
    }
}

export default new LinkMiddleware()
