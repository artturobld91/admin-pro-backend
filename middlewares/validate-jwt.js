const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = (req, res = response, next) => {

    // Read Token
    const token = req.header('x-token')
    console.log('Token: ' + token);

    if(!token)
    {
        return res.status(401).json({
            ok: false,
            msg: 'Token is not present in request'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        console.log('uid: ' + uid);
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token not Valid'
        });
    }

}

const validateAdminRole = async(req, res, next) => {

    const uid = req.uid;

    try {

        const userDB = await User.findById(uid);

        if(!userDB)
        {
            return res.status(404).json({
                ok: false,
                msg: 'User does not exists'
            });
        }

        if( userDB.role !== 'ADMIN_ROLE' ){
            return res.status(403).json({
                ok: false,
                msg: 'User does not have rights'
            });
        }

        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact your administrator'
        });
    }

}

const validateAdminRoleOrSameUser = async(req, res, next) => {

    const uid = req.uid;
    const id = req.params.id;

    try {

        const userDB = await User.findById(uid);

        if(!userDB)
        {
            return res.status(404).json({
                ok: false,
                msg: 'User does not exists'
            });
        }

        if( userDB.role !== 'ADMIN_ROLE' && uid !== id ){
            return res.status(403).json({
                ok: false,
                msg: 'User does not have rights'
            });
        }

        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact your administrator'
        });
    }

}

module.exports = {
    validateJWT,
    validateAdminRole,
    validateAdminRoleOrSameUser
}