import express = require('express')
import { decodedUser, User } from '../../src/routes/users/types/users.types'

declare global {
    namespace Express {
        interface Request {
            user: User
            decodedUser: decodedUser
        }
    }
}
