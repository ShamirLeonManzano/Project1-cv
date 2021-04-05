import {Router} from 'express'
import { check } from 'express-validator'
import { articulosControllers } from '../controllers/articulos.js';
import { existeArticuloById, existeArticuloByNombre } from '../helpers/articulos.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';


const router = Router();

router.get('/',[
    validarJWT,
    validarCampos
],articulosControllers.articuloGet);

router.get('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos
],articulosControllers.articuloGetById);

router.get('/categoria/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],articulosControllers.articuloGetByCategoria);

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('nombre').custom(existeArticuloByNombre),
    validarCampos
],articulosControllers.articuloPost);

router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('nombre').custom(existeArticuloByNombre),
    check('id').custom(existeArticuloById),
    validarCampos
],articulosControllers.articuloPut);

router.put('/activar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos
],articulosControllers.articuloPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos
],articulosControllers.articuloPutDesactivar);

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos
],articulosControllers.articuloDelete);

export default router;