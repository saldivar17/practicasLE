const { Router } = require('express');
const router = Router();

// para validar la sesion 
const { isAuthenticated } = require('../helpers/validation');

const {
    renderNotesForm,
    createNotesNew,
    renderNotesList,
    renderNotesEdit,
    updateNotes,
    deleteNotes
} = require('../controllers/controllersNotes');

// create notes
router.get('/notes/add', isAuthenticated, renderNotesForm );
router.post('/notes/add', isAuthenticated, createNotesNew );

//list notes
router.get('/notes/list', isAuthenticated, renderNotesList );

//edit notes
router.get('/notes/edit/:id', isAuthenticated, renderNotesEdit);
router.put('/notes/edit/:id', isAuthenticated, updateNotes);

//delete notes
router.delete('/notes/delete/:id', isAuthenticated, deleteNotes);

module.exports = router;