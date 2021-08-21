import express from 'express'
import { check, validationResult } from 'express-validator'
import debug from 'debug'
import CommonValidator from '../../common/validators/common.validator'

const log: debug.IDebugger = debug('app:users-validator')

class UsersValidator extends CommonValidator {
    
    usernameChecks = this.validate([
        check('username')
            .trim()
            .escape()
            .notEmpty()
            .withMessage(`Username can't be empty`),
    ])

    passwordChecks = this.validate([
        check('password')
            .notEmpty()
            .trim()
            .escape()
            .withMessage('Password cannot be empty')
            .isLength({ min: 5 })
            .withMessage('Must be at least 5 chars long'),
        // .matches(/\d/)
        // .withMessage('Must contain a number')
    ])

    loginChecks = this.validate([
        check('username')
            .trim()
            .escape()
            .notEmpty()
            .withMessage(`Username can't be empty`),
        check('password')
            .notEmpty()
            .trim()
            .escape()
            .withMessage('Password cannot be empty'),
    ])
}

export default new UsersValidator()
