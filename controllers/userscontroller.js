const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');


const getUsers = async(req, res) => {
    
    const from = Number(req.query.from) || 0;
    console.log(from);
    // const users = await User
    //                     .find({}, 'name email role google')
    //                     .skip( from ) //For pagination
    //                     .limit( 5 );  //For pagination

    // const total = await User.count();

    const [ users, total ] = await Promise.all([
        User
            .find({}, 'name email role google img')
            .skip( from ) //For pagination
            .limit( 5 ),  //For pagination

        User.countDocuments() // using countDocuments() since count() gonna be depecrated
    ]);
    
    res.status(200).json({
        ok:true,
        users,
        total
    });
} 

// In Promises, when using await we have to make method as async
const createUser = async(req, res = response) => {

    const { email, password } = req.body;
    
    try {

        const emailExists = await User.findOne({ email })

        if(emailExists){
            return res.status(400).json({
                ok: false,
                msg: 'The email already exists'
            });
        }

        const user = new User( req.body ); //Mongoose Creates Instance

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Save User
        await user.save();

        //Generate Token
        const token = await generateJWT(user.id);

        res.status(200).json({
            ok:true,
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error... check logs'
        })
    }
    
} 

const updateUser = async (req, res = response) => {

    const uid = req.params.id;

    try{
        
        // TODO: Validate Token and check is it's the correct user.

        const userDB = await User.findById( uid );

        if(!userDB)
        {
            return res.status(404).json({
                ok: false,
                msg: 'No user exists with that ID'
            })
        }

        // Update
        //const fields = req.body;
        const {password, google, email, ...fields} = req.body; // To not send password and google properties

        if(userDB.email !== email){

            const emailExists = await User.findOne({ email });
            if(emailExists)
            {
                return res.status(400).json({
                    ok: false,
                    msg: 'Already exists an user with that email.'
                })
            }
        }
        
        //delete fields.password; Not needed because of refactorization const {password, google, ...fields} = req.body;
        //delete fields.google;
        if(!userDB.google){
            fields.email = email;
        } else if(userDB.email !== email){
            return res.status(400).json({
                ok: false,
                msg: 'Google users cannot update their email.'
            })
        }

        const updatedUser = await User.findByIdAndUpdate(uid, fields, {new: true});

        res.json({
            ok:true,
            user: updatedUser
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected error'
        })
    }
}

const deleteUser = async (req, res = response) => {
    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid);

        if(!userDB)
        {
            return res.status(404).json({
                ok: false,
                msg: 'There is no user with that uid'
            });
        }

        await User.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'User successfully deleted.'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'An error occured during delete operation'
        });
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}