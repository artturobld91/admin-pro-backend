/*
    Doctors
    route: '/api/doctors'
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validatefields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getDoctors, createDoctors, updateDoctors, deleteDoctors } = require('../controllers/doctorscontroller')

const router = Router();


router.get('/', getDoctors);

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
    updateDoctors
);

router.delete(
    '/:id',
    deleteDoctors
);


module.exports = router;