const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify( googleToken );

        const userDB = await User.findOne({ email });
        let user;

        if(!userDB){
            user = new User({
                name: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        }
        else
        {
            //User exists
            user = userDB;
            user.google = true;
            //user.password = '@@@';
        }

        //Save in DB
        await user.save();

        // Generate Token JWT
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            msg: 'Google Signin',
            token
        });

        // res.json({
        //     ok: true,
        //     msg: 'Google Signin',
        //     name, email, picture
        // });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: true,
            msg: 'Google token is not valid'
        });
    }

}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generate Token JWT
    const token = await generateJWT(uid);

    res.json({
        ok: true,
        token
    });
}


module.exports = {
    login,
    googleSignIn,
    renewToken
}