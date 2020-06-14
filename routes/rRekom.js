const express = require('express');
const router = express.Router();

const cRekom = require('../controllers/cRekom');

router.post('/createRekom', cRekom.createRekom);
router.put('/updateRekom', cRekom.editRekom);
router.get('/listRekom', cRekom.listRekom);
router.delete('/deleteRekom/:rekomId', cRekom.removeRekom);
router.get('/findRekom/:rekomId', cRekom.getRekomById);

module.exports = router;
