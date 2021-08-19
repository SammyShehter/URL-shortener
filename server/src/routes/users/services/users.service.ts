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

    generateAccessToken(username: string): string {
        return jwt.sign({username}, process.env.JWT_TOKEN, {expiresIn: '1h'})
    }
}

export default new UserService()
