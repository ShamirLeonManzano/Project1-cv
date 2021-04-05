import { Router } from 'express';
import { check } from 'express-validator';
import ventaControllers from '../controllers/ventas.js';
import { validarCampos } from '../middlewares/validar-campos.js'
import { validarJWT } from '../middlewares/validar-jwt.js'

const router = Router();

router.get('/',[
    validarJWT,
    validarCampos
],ventaControllers.ventaGet);

router.get('/:id',[
    validarJWT,
    validarCampos,
    check('id', 'No es un ID válido').isMongoId(),
],ventaControllers.ventaGetById);

router.post('/',[
    validarJWT,
    validarCampos
],ventaControllers.ventaPost);

router.put('/activar/:id',[
    validarJWT,
    validarCampos,
    check('id', 'No es un ID válido').isMongoId(),
],ventaControllers.ventaPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    validarCampos,
    check('id', 'No es un ID válido').isMongoId(),
],ventaControllers.ventaPutDesactivar);

export default router;