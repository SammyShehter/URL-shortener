import express from 'express'
import { error } from '../../common/functions/common.function'
import debug from 'debug'
import shortid from 'shortid'
import LinkService from '../services/links.service'
import LinkDao from '../daos/links.dao'

const log: debug.IDebugger = debug('app:links-controller')

class LinkController {
    async allLinks(req: express.Request, res: express.Response) {
        try {
            const allLinks = await LinkDao.getAllLinks(req.decodedUser.id)
            res.send(allLinks)
        } catch (e) {
            error(e, req, res)
        }
    }

    async addLink(req: express.Request, res: express.Response) {
        try {
            const { from } = req.body
            const linkExists = await LinkDao.findLink(from)
            if (linkExists) return res.json({ link: linkExists })
            
            const link = LinkService.createNewLink({
                from,
                owner: req.decodedUser.id,
            })

            await LinkDao.addLink(link)

            res.status(201).json(link)
        } catch (e) {
            error(e, req, res)
        }
    }

    async byId(req: express.Request, res: express.Response) {
        try {
            const link = await LinkDao.findLink(req.params.id)
            res.json(link)
        } catch (e) {
            error(e, req, res)
        }
    }
}

export default new LinkController()
