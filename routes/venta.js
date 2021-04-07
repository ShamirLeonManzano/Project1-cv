import { Router } from 'express';
import { check } from 'express-validator';
import ventaControllers from '../controllers/ventas.js';
import { validarCampos } from '../middlewares/validar-campos.js'
import { validarJWT } from '../middlewares/validar-jwt.js'
import {existeVentaById, validarArticulosDetalles } from '../helpers/ventas.js'
import {validarRoles} from '../middlewares/validar-rol.js'

const router = Router();

router.get('/',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    validarCampos
],ventaControllers.ventaGet);

router.get('/:id',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentaById),
    validarCampos
],ventaControllers.ventaGetById);

router.post('/',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('usuario','El usuario es obligatorio').notEmpty(),
    check('persona','La persona es obligatoria').notEmpty(),
    check('tipo_comprobante','El tipo de comprobante es obligatorio').notEmpty(),
    check('serie_comprobante','La serie del comprobante es obligatoria').notEmpty(),
    check('num_comprobante','El numero del comprobante es obligatorio').notEmpty(),
    check('detalles').custom(validarArticulosDetalles), 
    validarCampos
],ventaControllers.ventaPost);
 
router.put('/activar/:id',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentaById),
    validarCampos
],ventaControllers.ventaPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    validarRoles('VENDEDOR_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeVentaById),
    validarCampos,
],ventaControllers.ventaPutDesactivar);

export default router;