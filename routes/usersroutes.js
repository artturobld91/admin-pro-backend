/*
    Route: /api/users
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validatefields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/userscontroller')

const router = Router();


router.get('/', validateJWT, getUsers);

router.post(
    '/',
    [
        check('name', 'The name is obligatory.').not().isEmpty(),
        check('password', 'The password is obligatory.').not().isEmpty(),
        check('email', 'The email is obligatory.').isEmail(),
        validatefields,
    ] , 
    createUser
);

router.put(
    '/:id',
    [
        validateJWT,
        check('name', 'The name is obligatory.').not().isEmpty(),
        check('email', 'The email is obligatory.').isEmail(),
        check('role', 'The role is obligatory.').not().isEmpty(),
        validatefields,
    ] , 
    updateUser
);

router.delete(
    '/:id',
    validateJWT,
    deleteUser
);


module.exports = router;