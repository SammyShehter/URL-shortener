import debug from 'debug'
import shortid from 'shortid'

const log: debug.IDebugger = debug('app:links-service')

class LinkService {
    createNewLink({from, owner}) {
        const baseURL = process.env.BASE_URL
        const code = shortid.generate()
        const to = `${baseURL}/t/${code}`
        const expDate = Date.now() + 86400000
        return {
            from,
            to,
            code,
            owner,
            expDate
        }
    }
}

export default new LinkService()
