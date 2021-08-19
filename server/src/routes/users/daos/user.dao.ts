import debug from 'debug'
import { CreateUserDto } from '../dto/create.user.dto'
import mongooseService from '../../common/services/mongoose.service'
import { User } from '../types/users.types'

const log: debug.IDebugger = debug('app:users-dao')

class UsersDao {
    constructor() {
        log('Created new instance of UsersDao')
    }

    Schema = mongooseService.getMongoose().Schema
    ObjectId = this.Schema.Types.ObjectId

    UserSchema = new this.Schema<User>(
        {
            username: { type: String, required: true, unique: true },
            password: { type: String, required: true},
            links: [{type: this.ObjectId, ref: 'Link'}]
        },
        { versionKey: false}
    )

    User = mongooseService.getMongoose().model<User>('Users', this.UserSchema)

    //TODO weird error got here with types
    async addUser(userFields: CreateUserDto) {
        const instance = new this.User({ 
            ...userFields
        })
        await instance.save()
        return instance.username
    }

    async findUser(username: string) {
        return this.User.findOne({username}).exec()
    }

    async removeUser(username: string) {
        return this.User.deleteOne({ username }).exec()
    }
}

export default new UsersDao()
