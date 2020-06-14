const response = require('../util/response');
const User = require('../models/mUser');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res, next) => {
    try {
        const { username, password, name } = req.body;
        const hashPassword = await bcrypt.hash(password, 12);
        const signup = new User({
            username,
            password: hashPassword,
            name
        });
        const saveUser = await signup.save();
        res.status(200).json(response.responseSuccess(saveUser));
    } catch (err) {
        res.status(400).json(response.responseBadRequest(err.message));
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const dataUser = await User.findOne({ username });
        if (!dataUser) {
            res.status(400).json(response.responseBadRequest('Invalid email or Password!'));
        }
        const doMatch = await bcrypt.compare(password, dataUser.password);
        if (doMatch) {
            return res.status(200).json(response.responseSuccess(dataUser));
        }
        return res.status(400).json(response.responseBadRequest('Invalid email or Password!'));
    } catch (err) {
        res.status(400).json(response.responseBadRequest(err.message));
    }
}

exports.listUser = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const userQuery = User.find({});
    let fetchUser;
    if (pageSize && currentPage) {
        userQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    userQuery.then(documents => {
        fetchUser = documents;
        return User.countDocuments({});
    }).then(count => {
        res.status(200).json(response.responseSuccess({ dataUser: fetchUser, count }));
    }).catch(err => {
        res.status(400).json(response.responseBadRequest(err.message));
    });
}

exports.removeUser = async (req, res, next) => {
    const id = await req.params.userId;
    try {
        const dataUser = await User.findById(id);
        if (!dataUser) {
            return res.status(404).json(response.responseNotFound(`id : ${id} Not Found!`));
        }
        await User.deleteOne({ _id: id }).then(result => {
            res.status(200).json(response.responseSuccess(`id : ${id} Delete Success!`));
        });
    } catch (err) {
        res.status(400).json(response.responseBadRequest(err.message));
    }
}

exports.editUser = async (req, res, next) => {
    const { idUser, name } = req.body;
    try {
        const dataUser = await User.findById(idUser);
        if (!dataUser) {
            return res.status(404).json(response.responseNotFound(`id : ${idUser} Not Found!`));
        }
        dataUser.name = name;
        await dataUser.save().then(result => {
            res.status(200).json(response.responseSuccess(result));
        })
    } catch (err) {
        res.status(400).json(response.responseBadRequest(err.message));
    }
}

exports.getUserById = async (req, res, next) => {
    const id = req.params.userId;
    try {
        const dataUser = await User.findById(id);
        if (!dataUser) {
            return res.status(404).json(response.responseNotFound(`id : ${id} Not Found!`));
        }
        return res.status(200).json(response.responseSuccess(dataUser));
    } catch (err) {
        res.status(400).json(response.responseBadRequest(err.message));
    }
}
