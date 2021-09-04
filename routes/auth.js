const { Router } = require('express');
const { check } = require('express-validator');
const { validatefields } = require('../middlewares/validateFields');
const { login, googleSignIn } = require('../controllers/authcontroller')

const router = Router();

router.post('/', 
    [
        check('password', 'The password is obligatory.').not().isEmpty(),
        check('email', 'The email is obligatory.').isEmail(),
        validatefields
    ],
    login 
)

router.post('/google', 
    [
        check('token', 'Google token is mandatory.').not().isEmpty(),
        validatefields
    ],
    googleSignIn 
)




module.exports = router;