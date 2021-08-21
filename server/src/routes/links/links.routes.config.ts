import { debug } from 'debug'
import express from 'express'
import { CommonRoutesConfig } from '../common/common.routes.config'
import commonMiddleware from '../common/middlewares/common.middleware'
import LinksController from './controllers/links.controller'
import LinkMiddleware from './middleware/links.middleware'
import LinksValidator from './validators/links.validator'

const log: debug.IDebugger = debug('app:link-routes')

export class LinkRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'LinksRoutes')
    }

    configureRoutes() {
        this.app
            .route('/links')
            .all(commonMiddleware.authUserToken)
            .get(LinksController.allLinks)

        this.app
            .route('/links/add')
            .all(commonMiddleware.authUserToken)
            .post(LinksController.addLink)

        this.app
            .route('/links/byId/:id')
            .all(commonMiddleware.authUserToken)
            .get(LinksController.byId)
        return this.app
    }
}
