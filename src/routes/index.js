const express = require('express');
const router = express.Router();//para ir agregando rutas

const mainController = require('../controllers/mainController');
router.get('/',mainController.begin);
router.post('/login',mainController.authenticate);
router.post('/register',mainController.add);
router.get('/gotoRegistro',mainController.gotoRegistro);
router.get('/gotoMiPerfil',mainController.gotoMiPerfil);
router.get('/gotoMisAlacenas',mainController.gotoMisAlacenas);
router.get('/gotoAlacena/:PantryCode',mainController.gotoAlacena);
router.get('/gotoGastos',mainController.gotoGastos);
router.get('/gotoAgregarAlacena',mainController.gotoAgregarAlacena);
router.get('/gotoMain',mainController.gotoMain)
router.post('/addAlacena',mainController.addAlacena);
router.post('/updatePassword',mainController.updatePassword);

module.exports = router;