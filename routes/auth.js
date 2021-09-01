const { Router } = require('express');
const { login } = require('../controllers/authcontroller')
const { check } = require('express-validator');
const { validatefields } = require('../middlewares/validateFields');

const router = Router();

router.post('/', 
    [
        check('password', 'The password is obligatory.').not().isEmpty(),
        check('email', 'The email is obligatory.').isEmail(),
    ],
    validatefields,
    login 
)




module.exports = router;