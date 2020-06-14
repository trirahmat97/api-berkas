const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//define router
const rIzin = require('./routes/rIzin');
const rRekom = require('./routes/rRekom');
const rUser = require('./routes/rUser');

const app = express();
const urlDB = 'mongodb://127.0.0.1:27017/apps-polda';

mongoose.connect(urlDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connect');
}).catch(() => {
    console.log('disconnect')
});

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//router api
app.use("/api/izin", rIzin);
app.use("/api/rekom", rRekom);
app.use("/api/user", rUser);

const port = process.env.PORT || "3000";
app.listen(port);