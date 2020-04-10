const { body, validationResult } = require('express-validator')
const categoryValidationRules = () => {
    return [
        // username must be an email
        body('imagelogo').exists(),
        body('imagesidebar').exists(),
        // password must be at least 5 chars long

    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    console.log(extractedErrors);

    return res.status(200).json({
        errors: extractedErrors,
    })
}

module.exports = {
    categoryValidationRules,
    validate,
}