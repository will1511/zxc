const mongoose = require ('mongoose');
const dokterSchema = new mongoose.Schema({
    photo: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phonenumber: {
        type: Number
    },
    hospital: {
        type: String
    },
    domisili: {
        type: String
    },
    spesialis: {
        type: String
    },
    pengalaman: {
        type: String
    },
    dokumen: {
        type: String
    },
    role: {
        type: Number
    }
});
module.exports = mongoose.model("DokterData", dokterSchema, 'Dokter');
