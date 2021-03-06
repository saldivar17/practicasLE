const {Router} = require('express');
const router = Router();
const {
    renderConfigForm,
    enviarCorreo,
    createConfig,
    updateConfig
} = require('../controllers/controllersConfig');

// para validar la sesion 
const { isAuthenticated } = require('../helpers/validation');

//Mostrar el modulo Config
router.get('/config', isAuthenticated, renderConfigForm);

//Enviar un correo
router.post('/config/enviar', isAuthenticated, enviarCorreo);

//Guardar una nueva config
router.post('/config/new', isAuthenticated, createConfig);

//editar el config
router.put('/config/edit/:id', isAuthenticated, updateConfig);

module.exports = router;