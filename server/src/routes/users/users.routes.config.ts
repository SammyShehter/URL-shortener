import { debug } from 'debug'
import express from 'express'
import { check } from 'express-validator'
import { CommonRoutesConfig } from '../common/common.routes.config'
import CommonMiddleware from '../common/middlewares/common.middleware'
import UsersController from './controllers/user.controller'
import UsersMiddleware from './middleware/users.middleware'

const log: debug.IDebugger = debug('app:user-routes')

export class UserRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes')
    }

    configureRoutes() {
        this.app.route('/users').get(UsersController.test)

        this.app
            .route('/users/register')
            .all(
                check('username').notEmpty().trim().escape(),
                check('password')
                    .notEmpty()
                    .trim()
                    .escape()
                    .isLength({ min: 4, max: 10 }),
                CommonMiddleware.validatorErrors,
                UsersMiddleware.checkIfUserExists
            )
            .get(UsersController.registerUser)

        this.app
            .route('/users/login')
            .all(
                check('username').notEmpty().trim().escape(),
                check('password').notEmpty().trim().escape(),
                CommonMiddleware.validatorErrors,
                UsersMiddleware.checkIfUserDoesNotExists
            )
            .post(UsersController.loginUser)
        return this.app
    }
}
