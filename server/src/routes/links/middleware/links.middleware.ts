import debug from 'debug'
import express from 'express'
import { error } from '../../common/functions/common.function'
import LinkService from '../services/links.service'
import LinkDao from '../daos/links.dao'

const log: debug.IDebugger = debug('app:links-middleware')

export class LinkMiddleware {

}

export default new LinkMiddleware()
