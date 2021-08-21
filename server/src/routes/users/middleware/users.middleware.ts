import debug from 'debug'
import express from 'express'
import { error } from '../../common/functions/common.function'
import UserService from '../services/users.service'
import UserDao from '../daos/user.dao'

const log: debug.IDebugger = debug('app:users-middleware')

export class UserMiddleware {
    async checkIfUserExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try {
            const { username } = req.body
            const candidate = await UserDao.findUser(username)
            if (candidate) throw new Error('User already exists!')
            next()
        } catch (e) {
            error(e, req, res)
        }
    }

    async checkIfUserDoesNotExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try {
            const {username} = req.body
            const user = await UserDao.findUser(username)
            if (!user) throw new Error(`Username or password is incorrect`)
            req.user = user
            next()
        } catch (e) {
            error(e, req, res, 401)
        }
    }

    async checkIfPasswordMatches(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        try {
            const { password } = req.body

            const isMatch = await UserService.passwordMatch({
                password,
                hashedPassword: req.user.password,
            })
            if (!isMatch) throw new Error('Username or password is incorrect')

            next()
        } catch (e) {
            error(e, req, res, 401)
        }
    }
}

export default new UserMiddleware()
