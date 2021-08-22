import debug from 'debug'
import { CreateLinkDto } from '../dto/create.links.dto'
import mongooseService from '../../common/services/mongoose.service'
import { Link } from '../types/linkes.types'

const log: debug.IDebugger = debug('app:links-dao')

class LinksDao {
    constructor() {
        log('Created new instance of LinksDao')
    }

    Schema = mongooseService.getMongoose().Schema
    ObjectId = this.Schema.Types.ObjectId

    LinkSchema = new this.Schema<Link>(
        {
            from: { type: String, required: true },
            to: {type: String, required: true, unique: true},
            code: {type: String, required: true, unique: true},
            expDate: {type: Number, required: true},
            clicks: {type: Number, default: 0 },
            owner: {type: this.ObjectId, ref: 'User'}
        },
        { versionKey: false }
    )

    Link = mongooseService.getMongoose().model<Link>('Links', this.LinkSchema)

    async getAllLinks(owner: string) {
        return this.Link.find({owner}).exec()
    }

    async addLink(linkFields: CreateLinkDto) {
        const instance = new this.Link({
            ...linkFields,
        })
        await instance.save()
        return instance._id
    }

    async findLinkByCode(code: string) {
        return this.Link.findOne({ code }).exec()
    }

    async findLinkByOrigin(from: string) {
        return this.Link.findOne({ from }).exec()
    }

    async findLinkById(_id: string) {
        return this.Link.findOne({ _id }).exec()
    }

    async addNewClick(link: Link){
        return this.Link.findOneAndUpdate({_id: link._id}, {clicks: link.clicks + 1})
    }

    async removeLink(code: string) {
        return this.Link.deleteOne({ code }).exec()
    }
}

export default new LinksDao()
