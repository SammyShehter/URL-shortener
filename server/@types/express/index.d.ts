import express = require('express')
import { Link } from '../../src/routes/links/types/linkes.types'
import { decodedUser, User } from '../../src/routes/users/types/users.types'

declare global {
    namespace Express {
        interface Request {
            user: User
            decodedUser: decodedUser
            link: Link
        }
    }
}
