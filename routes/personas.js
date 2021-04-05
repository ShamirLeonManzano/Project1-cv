import {Router} from 'express'
import { check } from 'express-validator'
import personasControllers from '../controllers/personas.js';
import { existePersonaById, existePersonaByNombre } from '../helpers/personas.js';
import { validarCampos } from '../middlewares/validar-campos.js'
import { validarJWT } from '../middlewares/validar-jwt.js'
import { validarListaClientes } from '../middlewares/validar-lista-clientes.js';

const router = Router();

router.get('/',[
    validarJWT,
    validarCampos
],personasControllers.personaGet);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos
],personasControllers.personaGetById);

router.get('/listClientes/:tipo',[
    validarJWT,
    //validarListaClientes,
    validarCampos
],personasControllers.personaGetClientes);

router.get('/listProveedores/:tipo',[
    validarJWT, 
    validarCampos
],personasControllers.personaGetProveedores);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('nombre').custom(existePersonaByNombre),
    validarCampos
],personasControllers.personaPost);

router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('nombre').custom(existePersonaByNombre),
    check('id').custom(existePersonaById),
    validarCampos
],personasControllers.personaPut);

router.put('/activar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos
],personasControllers.personaPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos
],personasControllers.personaPutDesactivar);

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos
],personasControllers.personaPutDelete);

export default  router;

