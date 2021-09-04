const { response } = require('express');

const Doctor = require('../models/doctor');

const getDoctors = async(req,res = response) => {

    const doctors = await Doctor.find()
                                .populate('user', 'name')
                                .populate('hospital','name');

    res.json({
        ok: true,
        doctors
    });
}

const createDoctors = async(req,res = response) => {

    const { name, hospitalid } = req.body;

    const uid = req.uid;

    // const doctor = new Doctor();
    // doctor.user = uid;
    // doctor.name = name;
    // doctor.hospital = hospitalid;

    const doctor = new Doctor({
        user: uid,
        ...req.body
    });

    try {

        const userDB = await doctor.save();

        res.json({
            ok: true,
            doctor: userDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact your administrator'
        });
    }
}

const updateDoctors = (req,res = response) => {

    res.json({
        ok: true,
        msg: 'updateDoctors'
    });
}

const deleteDoctors = (req,res = response) => {

    res.json({
        ok: true,
        msg: 'deleteDoctors'
    });
}

module.exports = {
    getDoctors,
    createDoctors,
    updateDoctors,
    deleteDoctors
}