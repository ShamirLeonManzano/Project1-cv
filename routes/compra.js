import { Router } from 'express';
import { check } from 'express-validator';
import compraControllers from '../controllers/compras.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import {existeCompraById} from '../helpers/compras.js'
const router = Router();

router.get('/',[
    validarJWT,
    validarCampos,
],compraControllers.compraGet);

router.get('/:id',[
    validarJWT,
    validarCampos,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCompraById),
],compraControllers.compraGetById);

router.post('/',[
    validarJWT,
    validarCampos
],compraControllers.compraPost);

router.put('/activar/:id',[
    validarJWT,
    validarCampos,
    check('id', 'No es un ID válido').isMongoId(),
],compraControllers.compraPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    validarCampos,
    check('id', 'No es un ID válido').isMongoId(),
],compraControllers.compraPutDesactivar);

export default router;