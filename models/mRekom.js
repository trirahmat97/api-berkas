const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rekomSchema = new Schema({
    noRegistrasi: {
        type: String,
        required: true
    },
    tanggalRekom: {
        type: Date,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    perihal: {
        type: String,
        required: true
    },
    keterangan: {
        type: String,
        required: true
    },
    tipeRekom: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Rekom', rekomSchema);