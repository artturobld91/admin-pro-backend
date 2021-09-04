/*
    Search
    Route: /api/search
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validatefields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getSearchAll, getDocumentsCollection } = require('../controllers/searchcontroller')

const router = Router();


router.get('/:searchCriteria', validateJWT, getSearchAll);

router.get('/collection/:table/:searchCriteria', validateJWT, getDocumentsCollection);


module.exports = router;