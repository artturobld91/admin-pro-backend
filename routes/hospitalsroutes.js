/*
    Hospitals
    route: '/api/hospitals'
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validatefields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getHospitals, createHospitals, updateHospitals, deleteHospitals } = require('../controllers/hospitalscontroller')

const router = Router();


router.get('/', getHospitals);

router.post(
    '/',
    [
        validateJWT,
        check('name', 'The hospitals name is mandatory.').not().isEmpty(),
        validatefields
    ],
    createHospitals
);

router.put(
    '/:id',
    updateHospitals
);

router.delete(
    '/:id',
    deleteHospitals
);


module.exports = router;