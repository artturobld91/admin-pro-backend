const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res = response ) => {

    const { email, password } = req.body;

    try {

        //Verify email
        const userDB = await User.findOne({email: email});

        if(!userDB)
        {
            res.status(404).json({
                ok: false,
                msg: 'Email or Password Invalid.'
            });
        }

        //Verify password
        const validPassword = bcrypt.compareSync(password, userDB.password );

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password not valid'
            });
        }

        // Generate Token JWT
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            token,
            msg: 'Login successful'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact your administrator.'
        })
    }
}


module.exports = {
    login
}