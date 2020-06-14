const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const izinSchema = new Schema({
    pemohon: {
        type: String,
        required: true
    },
    tanggalIzin: {
        type: Date,
        required: true
    },
    noRegistrasi: {
        type: String,
        required: true
    },
    properti: {
        type: Object,
    },
    keperluan: {
        type: String,
        required: true
    },
    daerah: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    keterangan: {
        type: String,
        required: true
    },
    tipeIzin: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Izin', izinSchema);