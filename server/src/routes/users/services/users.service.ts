import debug from 'debug'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const log: debug.IDebugger = debug('app:users-service')

class UserService {
    async hashPassword (password: string) {
        return bcrypt.hash(password, 12)
    }

    async passwordMatch ({password, hashedPassword}) {
        return bcrypt.compare(password, hashedPassword)
    }

    generateAccessToken(user: {id: string}): string {
        return jwt.sign(user, process.env.JWT_TOKEN, {expiresIn: '30d'})
    }
}

export default new UserService()
