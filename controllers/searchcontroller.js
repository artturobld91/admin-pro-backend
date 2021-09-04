const { response } = require('express');

const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const getSearchAll = async(req, res = response) => {

    const searchCriteria = req.params.searchCriteria;
    const regex = new RegExp(searchCriteria, 'i');

    try {

        console.log(searchCriteria);

        const [ users, hospitals, doctors] = await Promise.all([
            User.find({name: regex}),
            Hospital.find({name: regex}),
            Doctor.find({name: regex})
        ])

        res.json({
            ok: true,
            users,
            hospitals,
            doctors
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact your administrator'
        });
    }

}

const getDocumentsCollection = async(req, res = response) => {

    const searchCriteria = req.params.searchCriteria;
    const table = req.params.table;
    const regex = new RegExp(searchCriteria, 'i');

    try {

        let data = [];

        switch(table){
            case 'Users':
                data = await User.find({name: regex});
            break;
        
            case 'Hospitals':
                data = await Hospital.find({name: regex});
            break;

            case 'Doctors':
                data = await Doctor.find({name: regex});
            break;

            default:
               return res.status(400).json({
                   ok: false,
                   msg: 'The table has to be Users/Doctors/Hospitals'
               });
        }

        res.json({
            ok: true,
            results: data
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact your administrator'
        });
    }

}

module.exports = {
    getSearchAll,
    getDocumentsCollection
}