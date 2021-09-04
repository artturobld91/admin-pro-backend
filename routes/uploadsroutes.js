/*
    Search
    Route: /api/upload
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validatefields } = require('../middlewares/validateFields');
const { validateJWT } = require('../middlewares/validate-jwt');
const expressfileUpload = require('express-fileupload');

const { fileUpload, returnImage } = require('../controllers/uploadscontroller')

const router = Router();

router.use(expressfileUpload());

router.put('/:type/:id', validateJWT, fileUpload);
router.get('/:type/:photo', validateJWT, returnImage);


module.exports = router;