const { response } = require('express');

const Hospital = require('../models/hospital')

const getHospitals = async(req, res = response) => {

    const hospitals = await Hospital.find().populate('user', 'name');

    res.json({
        ok: true,
        hospitals
    })
}

const createHospitals = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ...req.body});

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact your administrator'
        });
    }
}

const updateHospitals = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if(!hospital)
        {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital not found'
            });
        }

        //hospital.name = req.body.name;

        const hospitalChanges = {
            ...req.body,
            user: uid
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(id, hospitalChanges, { new: true });

        res.json({
            ok: true,
            hospital: updatedHospital
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact to your administrator'
        });
    }
    
}

const deleteHospitals = async(req, res = response) => {

    const id = req.params.id;

    try {

        const hospital = await Hospital.findById(id);

        if(!hospital)
        {
            return res.status(400).json({
                ok: false,
                msg: 'Hospital not found'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital Deleted'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact to your administrator'
        });
    }
}

module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
}