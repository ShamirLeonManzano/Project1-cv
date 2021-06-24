import { Router } from 'express';
import { check } from 'express-validator';
import compraControllers from '../controllers/compras.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import {existeCompraById, validarArticulosDetalles, validarTipoComprobante, existeArtDetId} from '../helpers/compras.js'
import {validarRoles} from '../middlewares/validar-rol.js'

const router = Router();

router.get('/',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    validarCampos,
],compraControllers.compraGet);

router.get('/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCompraById),
    validarCampos
],compraControllers.compraGetById);

router.post('/',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('usuario','El usuario es obligatorio').notEmpty(),
    check('persona','La persona es obligatoria').notEmpty(),
    check('tipo_comprobante','El tipo de comprobante es obligatorio').notEmpty(),
    check('tipo_comprobante').custom(validarTipoComprobante),
    check('serie_comprobante','La serie del comprobante es obligatoria').notEmpty(),
    check('num_comprobante','El numero del comprobante es obligatorio').notEmpty(),
    check('detalles').custom(existeArtDetId),
    check('detalles').custom(validarArticulosDetalles), 
    validarCampos
],compraControllers.compraPost);

router.put('/activar/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCompraById),
    validarCampos
],compraControllers.compraPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    validarRoles('ALMACENISTA_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCompraById),
    validarCampos,
],compraControllers.compraPutDesactivar);

export default router;