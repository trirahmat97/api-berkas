const express = require('express');
const router = express.Router();

const cUser = require('../controllers/cUser');

router.post('/signup', cUser.signup);
router.post('/login', cUser.login);
router.put('/updateUser', cUser.editUser);
router.get('/listUser', cUser.listUser);
router.delete('/deleteUser/:userId', cUser.removeUser);
router.get('/findUser/:userId', cUser.getUserById);

module.exports = router;
