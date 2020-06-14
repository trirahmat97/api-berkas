const response = require('../util/response');
const Rekom = require('../models/mRekom');

exports.createRekom = async (req, res, next) => {
    const { noRegistrasi, tanggalRekom, to, perihal, keterangan, tipeRekom } = req.body;
    try {
        const dataRekom = new Rekom({
            noRegistrasi,
            tanggalRekom,
            to,
            perihal,
            keterangan,
            tipeRekom
        });
        const saveDataRekom = await dataRekom.save();
        await res.status(200).json(response.responseSuccess(saveDataRekom));
    } catch (err) {
        res.status(400).json(response.responseBadRequest(err.message));
    }
}

exports.listRekom = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const dataRekom = Rekom.find({});
    let fetchRekom;
    if (pageSize && currentPage) {
        dataRekom.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    dataRekom.then(documents => {
        fetchRekom = documents;
        return Rekom.countDocuments({});
    }).then(count => {
        res.status(200).json(response.responseSuccess({ dataRekom: fetchRekom, count }));
    }).catch(err => {
        res.status(400).json(response.responseBadRequest(err.message));
    });
}

exports.removeRekom = async (req, res, next) => {
    const id = await req.params.rekomId;
    try {
        const dataRekom = await Rekom.findById(id);
        if (!dataRekom) {
            return res.status(404).json(response.responseNotFound(`id : ${id} Not Found!`));
        }
        await Rekom.deleteOne({ _id: id }).then(result => {
            res.status(200).json(response.responseSuccess(`id : ${id} Delete Success!`));
        });
    } catch (err) {
        res.status(400).json(response.responseBadRequest(err.message));
    }
}

exports.editRekom = async (req, res, next) => {
    const { idRekom, noRegistrasi, tanggalRekom, to, perihal, keterangan, tipeRekom } = req.body;
    try {
        const dataRekom = await Rekom.findById(idRekom);
        if (!dataRekom) {
            return res.status(404).json(response.responseNotFound(`id : ${idRekom} Not Found!`));
        }
        dataRekom.noRegistrasi = noRegistrasi;
        dataRekom.tanggalRekom = tanggalRekom;
        dataRekom.to = to;
        dataRekom.perihal = perihal;
        dataRekom.keterangan = keterangan;
        dataRekom.tipeRekom = tipeRekom;
        await dataRekom.save().then(result => {
            res.status(200).json(response.responseSuccess(result));
        })
    } catch (err) {
        res.status(400).json(response.responseBadRequest(err.message));
    }
}

exports.getRekomById = async (req, res, next) => {
    const id = req.params.rekomId;
    try {
        const dataRekom = await Rekom.findById(id);
        if (!dataRekom) {
            return res.status(404).json(response.responseNotFound(`id : ${id} Not Found!`));
        }
        return res.status(200).json(response.responseSuccess(dataRekom));
    } catch (err) {
        res.status(400).json(response.responseBadRequest(err.message));
    }
}
