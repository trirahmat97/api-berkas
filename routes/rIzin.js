const express = require('express');
const router = express.Router();

const cIzin = require('../controllers/cIzin');

router.post('/createIzin', cIzin.createIzin);
router.put('/updateIzin', cIzin.editIzin);
router.get('/listIzin', cIzin.listIzin);
router.delete('/deleteIzin/:izinId', cIzin.removeIzin);
router.get('/findIzin/:izinId', cIzin.getIzinById);

module.exports = router;
