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

const updateDoctors = async(req,res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        
        const doctor = await Doctor.findById(id);

        if(!doctor)
        {
            return res.status(400).json({
                ok: false,
                msg: 'Doctor not found'
            });
        }

        //hospital.name = req.body.name;

        const doctorChanges = {
            ...req.body,
            user: uid
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(id, doctorChanges, { new: true });

        res.json({
            ok: true,
            doctor: updatedDoctor
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact your administrator.'
        });
    }
}

const deleteDoctors = async(req,res = response) => {

    const id = req.params.id;

    try {

        const doctor = await Doctor.findById(id);

        if(!doctor)
        {
            return res.status(400).json({
                ok: false,
                msg: 'Doctor not found'
            });
        }
        
        await Doctor.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Doctor Deleted'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact your administrator.'
        });
    }
}

module.exports = {
    getDoctors,
    createDoctors,
    updateDoctors,
    deleteDoctors
}