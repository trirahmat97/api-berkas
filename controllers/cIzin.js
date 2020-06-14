const response = require('../util/response');
const Izin = require('../models/mIzin');

exports.createIzin = async (req, res, next) => {
    const { pemohon, tanggalIzin, noRegistrasi, properti, keperluan, daerah, startDate, endDate, keterangan, tipeIzin } = req.body;
    try {
        const dataIzin = new Izin({
            pemohon,
            tanggalIzin,
            noRegistrasi,
            properti,
            keperluan,
            daerah,
            startDate,
            endDate,
            keterangan,
            tipeIzin
        });
        const saveDataIzin = await dataIzin.save();
        await res.status(200).json(response.responseSuccess(saveDataIzin));
    } catch (err) {
        res.status(400).json(response.responseBadRequest(err.message));
    }
}

exports.listIzin = async (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const izinQuery = Izin.find({});
    let fetchIzin;
    if (pageSize && currentPage) {
        izinQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    izinQuery.then(documents => {
        fetchIzin = documents;
        return Izin.countDocuments({});
    }).then(count => {
        res.status(200).json(response.responseSuccess({ dataIzin: fetchIzin, count: count }));
    }).catch(err => {
        res.status(400).json(response.responseBadRequest(err.message));
    });
}

exports.removeIzin = async (req, res, next) => {
    const id = await req.params.izinId;
    try {
        const dataIzin = await Izin.findById(id);
        if (!dataIzin) {
            return res.status(404).json(response.responseNotFound(`id : ${id} Not Found!`));
        }
        await Izin.deleteOne({ _id: id }).then(result => {
            res.status(200).json(response.responseSuccess(`id : ${id} Delete Success!`));
        });
    } catch (err) {
        res.status(400).json(response.responseBadRequest(err.message));
    }
}

exports.editIzin = async (req, res, next) => {
    const { idIzin, pemohon, tanggalIzin, noRegistrasi, properti, keperluan, daerah, startDate, endDate, keterangan, tipeIzin } = req.body;
    try {
        const dataIzin = await Izin.findById(idIzin);
        if (!dataIzin) {
            return res.status(404).json(response.responseNotFound(`id : ${idIzin} Not Found!`));
        }
        dataIzin.pemohon = pemohon;
        dataIzin.tanggalIzin = tanggalIzin;
        dataIzin.noRegistrasi = noRegistrasi;
        dataIzin.properti = properti;
        dataIzin.keperluan = keperluan;
        dataIzin.daerah = daerah;
        dataIzin.startDate = startDate;
        dataIzin.endDate = endDate;
        dataIzin.keterangan = keterangan;
        dataIzin.tipeIzin = tipeIzin;
        await dataIzin.save().then(result => {
            res.status(200).json(response.responseSuccess(result));
        })
    } catch (err) {
        res.status(400).json(response.responseBadRequest(err.message));
    }
}

exports.getIzinById = async (req, res, next) => {
    const id = req.params.izinId;
    try {
        const dataIzin = await Izin.findById(id);
        if (!dataIzin) {
            return res.status(404).json(response.responseNotFound(`id : ${id} Not Found!`));
        }
        return res.status(200).json(response.responseSuccess(dataIzin));
    } catch (err) {
        res.status(400).json(response.responseBadRequest(err.message));
    }
}
