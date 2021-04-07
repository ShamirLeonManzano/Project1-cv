import {Router} from 'express'
import { check } from 'express-validator'
import personasControllers from '../controllers/personas.js';
import { existePersonaById, existePersonaByNombre, existePersonaByNumDoc} from '../helpers/personas.js';
import { validarCampos } from '../middlewares/validar-campos.js'
import { validarJWT } from '../middlewares/validar-jwt.js'
import {validarRoles} from '../middlewares/validar-rol.js'

const router = Router();

router.get('/',[
    validarJWT,
    validarRoles('ADMIN_ROL'),
    validarCampos
],personasControllers.personaGet);

router.get('/:id',[
    validarJWT,
    validarRoles('ADMIN_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampos
],personasControllers.personaGetById);

router.get('/listClientes/:tipo',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    validarCampos
],personasControllers.personaGetClientes);

router.get('/listProveedores/:tipo',[
    validarJWT, 
    validarRoles('ALMACENISTA_ROL'),
    validarCampos
],personasControllers.personaGetProveedores);

router.post('/',[
    validarJWT,
    check('tipoPersona','El tipo de persona es obligatorio').notEmpty(),
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('tipoDocumento','El tipo de documento es obligatorio').notEmpty(),
    check('numeroDocumento','El numero de documento es obligatorio').notEmpty(),
    check('direccion','La direccion es obligatoria').notEmpty(),
    check('telefono','El telefono es obligatorio').notEmpty(),
    check('email','El email es obligatorio').notEmpty(),
    check('nombre').custom(existePersonaByNombre),
    check('numeroDocumento').custom(existePersonaByNumDoc),
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

