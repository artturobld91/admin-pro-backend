/*
    Doctors
    route: '/api/doctors'
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validatefields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getDoctors, createDoctors, updateDoctors, deleteDoctors, getDoctorById } = require('../controllers/doctorscontroller')

const router = Router();


router.get('/', validateJWT, getDoctors);

router.post(
    '/',
    [
        validateJWT,
        check('name', 'Doctor name is mandatory.').not().isEmpty(),
        check('hospital', 'Hospital Id is mandatory.').isMongoId(),
        validatefields
    ],
    createDoctors
);

router.put(
    '/:id',
    [
        validateJWT,
        check('name', 'Doctor name is mandatory.').not().isEmpty(),
        check('hospital', 'Hospital Id is mandatory.').isMongoId(),
        validatefields
    ],
    updateDoctors
);

router.delete(
    '/:id',
    [
        validateJWT
    ],
    deleteDoctors
);

router.get(
    '/:id',
    [
        validateJWT
    ],
    getDoctorById
);


module.exports = router;