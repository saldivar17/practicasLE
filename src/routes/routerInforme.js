const {Router} = require('express');
const router = Router();
const path = require('path');
const multer = require('multer');
const uuid = require('uuid/v4');
const modelsInforme = require('../models/modelsInforme');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/files'));
    },
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});

let upload = multer({
    storage
}).single('informeUser');

// para validar la sesion 
const { isAuthenticated } = require('../helpers/validation');

const {
    renderInformeList,
    listInforme,
    renderInformeListPersonal,
    listInformePersonal,
    createInforme,
    deleteInforme,
    loadInforme,
    uploadInforme,
    informeDia,
    cantidadInformeDia
} = require('../controllers/controllersInforme');

//listar los informes de cada personal
router.get('/informe/listPersonal', isAuthenticated, renderInformeListPersonal);

//listar todo los informes
router.get('/informe/list', isAuthenticated, renderInformeList);

//registrar un nuevo informe
router.post('/informe/add', isAuthenticated, upload, createInforme);

//Editar  informe
router.put('/informe/edit/:id', isAuthenticated, upload, uploadInforme);

/*=============== AJAX ===============*/
//listar informes personales (AJAX)
router.get('/informe/listPersonal/list', listInformePersonal);

//listar todos los informes de una fecha en especifico (AJAX)
router.get('/informe/list/list/:numInforme', listInforme);

//eliminar informe personales (AJAX)
router.delete('/informe/delete:id', deleteInforme);

//Cargar los datos para editar (AJAX)
router.get('/informe/edit:id', loadInforme);

//Mostrar mensaje del informe del dia - AJAX
router.get('/informe/informeDia', informeDia);

//Mostrar cantidad de informes del dia - AJAX
router.get('/informe/cantidadInformeDia/:numInforme', cantidadInformeDia);


module.exports = router;