import { debug } from 'debug'
import express from 'express'
import { CommonRoutesConfig } from '../common/common.routes.config'
import CommonMiddleware from '../common/middlewares/common.middleware'
import UsersController from './controllers/user.controller'
import UsersMiddleware from './middleware/users.middleware'
import UsersValidator from './validators/users.validator'

const log: debug.IDebugger = debug('app:user-routes')

export class UserRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes')
    }

    configureRoutes() {
        this.app
            .route('/users/register')
            .all(
                UsersValidator.usernameChecks,
                UsersValidator.passwordChecks,
                UsersMiddleware.checkIfUserExists
            )
            .post(UsersController.registerUser)

        this.app
            .route('/users/login')
            .all(
                UsersValidator.loginChecks,
                UsersMiddleware.checkIfUserDoesNotExists
            )
            .post(UsersController.loginUser)
        return this.app
    }
}
