import express from 'express'
import { check, validationResult } from 'express-validator'
import debug from 'debug'
import CommonValidator from '../../common/validators/common.validator'

const log: debug.IDebugger = debug('app:links-validator')

class LinksValidator extends CommonValidator {

    checkRecievedLink = this.validate([
        check('from')
            .trim()
            .escape()
            .notEmpty()
            .withMessage(`Link can't be empty`),
    ])

}

export default new LinksValidator()
