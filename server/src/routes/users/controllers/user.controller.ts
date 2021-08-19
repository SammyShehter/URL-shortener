import express from 'express'
import { error } from '../../common/functions/common.function'
import debug from 'debug'
import UserService from '../services/users.service'
import UserDao from '../daos/user.dao'

const log: debug.IDebugger = debug('app:users-controller')

class UserController {

    

    async registerUser (req: express.Request, res: express.Response) {
        try {
            const hashedPass = await UserService.hashPassword(req.body.password)
            const userFields = {
                username: req.body.username,
                password: hashedPass
            }
            const newUser = await UserDao.addUser(userFields)
            return res.status(201).json({message: `${newUser} created`})
        } catch (e) {
            error(e, req, res)
        }
    }

    async loginUser (req: express.Request, res: express.Response) {
        try {
            const token = UserService.generateAccessToken(req.user.username)
            return res.status(200).json({token})
        } catch (e) {
            error(e, req, res)
        }
    }

    async test (req: express.Request, res: express.Response) {
        res.status(200).send('ok')
    }
}

export default new UserController()
