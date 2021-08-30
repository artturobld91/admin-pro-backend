const mongoose = require('mongoose');


const dbConnection = async () => {

    try {

        //await mongoose.connect('mongodb+srv://artturobld:P%40ssw0rd@clustermongodb.829ur.mongodb.net/hospitaldb',{
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB online')

    } catch (error) {
        console.log(error);
        throw new Error('Error when initializing database, see logs...')
    }

    

}

module.exports = {
    dbConnection
}