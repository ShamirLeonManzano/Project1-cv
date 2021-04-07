import {Router} from 'express'
import { check } from 'express-validator'
import { articulosControllers } from '../controllers/articulos.js';
import { existeArticuloById, existeArticuloByNombre, existeArticuloByCod } from '../helpers/articulos.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import {validarRoles} from '../middlewares/validar-rol.js'


const router = Router();

router.get('/',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    validarCampos
],articulosControllers.articuloGet);

router.get('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos
],articulosControllers.articuloGetById);

router.get('/categoria/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],articulosControllers.articuloGetByCategoria);

router.post('/',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('categoria','La categoria es obligatoria').notEmpty(),
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('codigo','El codigo es obligatorio').notEmpty(),
    check('nombre').custom(existeArticuloByNombre),
    check('codigo').custom(existeArticuloByCod),
    validarCampos
],articulosControllers.articuloPost);

router.put('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('nombre').custom(existeArticuloByNombre),
    check('id').custom(existeArticuloById),
    validarCampos
],articulosControllers.articuloPut);

router.put('/activar/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos
],articulosControllers.articuloPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos
],articulosControllers.articuloPutDesactivar);

router.delete('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos
],articulosControllers.articuloDelete);

export default router;