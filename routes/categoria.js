import { Router } from 'express';
import categoriasControllers from '../controllers/categoria.js'
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeCategoriaById, existeCategoriaByNombre } from '../helpers/categorias.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.get('/',[
    validarJWT,
    validarCampos
], categoriasControllers.categoriaGet);

router.get('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriasControllers.categoriaGetById);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampos
], categoriasControllers.categoriaPost);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('nombre').custom(existeCategoriaByNombre),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriasControllers.categoriaPut);

router.put('/activar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriasControllers.categoriaPutActivar);

router.put('/desactivar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriasControllers.categoriaPutDesactivar);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriasControllers.categoriaPutDelete);

export default router;