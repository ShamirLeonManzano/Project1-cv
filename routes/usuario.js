import {Router} from 'express'
import usuarioController from '../controllers/usuario.js';
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import {existeUsuarioById} from '../helpers/usuarios.js'

const router=Router();

router.get('/',usuarioController.usuarioGet);

router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
],usuarioController.usuarioGetById);

router.post('/',[
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('email','El email es obligatorio').notEmpty(),
    check('password','La contraseña es obligatoria').notEmpty(),
    check('rol','El rol es obligatorio').notEmpty(),
    validarCampos
],usuarioController.usuarioPost);

router.post('/login',[
    check('email','El email es obligatorio').notEmpty(),
    check('password','La contraseña es obligatoria').notEmpty(),
],usuarioController.login);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
],usuarioController.usuarioPut);

router.put('/activar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
],usuarioController.usuarioPutActivar);

router.put('/desactivar/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioById),
],usuarioController.usuarioPutDesactivar);

export default router;