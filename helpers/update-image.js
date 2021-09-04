const fs = require('fs');
const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const deleteImage = (path) => {
    
    if(fs.existsSync(path)){
        //Delete image
        fs.unlinkSync(path);
    }
}

const updateImage = async(type, id, fileNameUUID) => {
    console.log('update image')

    let oldPath = '';

    switch(type)
    {
        case 'doctors':
            const doctor = await Doctor.findById(id) 
            if(!doctor){
                console.log('No doctor was found with that ID')
                return false;
            }

            oldPath = './uploads/doctors/${doctor.img}'
            deleteImage(oldPath);

            doctor.img = fileNameUUID;
            await doctor.save();
            return true;

        break;

        case 'hospitals':
            const hospital = await Hospital.findById(id) 
            if(!hospital){
                console.log('No hospital was found with that ID')
                return false;
            }

            oldPath = './uploads/hospitals/${hospital.img}'
            deleteImage(oldPath);

            hospital.img = fileNameUUID;
            await hospital.save();
            return true;

        break;

        case 'users':
            const user = await User.findById(id) 
            if(!user){
                console.log('No user was found with that ID')
                return false;
            }

            oldPath = './uploads/users/${user.img}'
            deleteImage(oldPath);

            user.img = fileNameUUID;
            await user.save();
            return true;

        break;

        default:
            break;

    }
}



module.exports = {
    updateImage
}