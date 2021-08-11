import Usuario from '../models/usuario.js'
import bcryptjs from 'bcrypt'
import { generarJWT } from '../middlewares/validar-jwt.js'


const usuarioController = {
    usuarioGet: async (req, res) => {
        const query = req.query.value
        const usuarios = await Usuario.find({
            $or: [
                { nombre: new RegExp(query, 'i') },
                { email: new RegExp(query, 'i') },
                { rol: new RegExp(query, 'i') }
            ]
        });

        res.json({
            usuarios
        })
    },

    usuarioGetById: async (req, res) => {
        const { id } = req.params
        const usuario = await Usuario.findById(id)

        res.json({
            usuario
        })
    },

    usuarioPost: async (req, res) => {
        const { nombre, email, password, rol, tipoDocumento, numeroDocumento, direccion, telefono } = req.body;
        const usuario = Usuario({ nombre, email, password, rol, tipoDocumento, numeroDocumento, direccion, telefono });

        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt)

        usuario.save();

        res.json({
            usuario
        })
    },

    login: async (req,res)=>{
        const {email, password}=req.body;

        const usuario = await Usuario.findOne({email})

        if(!usuario){
            return res.json({
                msg:`Usuario/Password no son correctos email`
            })
        }
        if (usuario.estado===0){
            return res.json({
                msg:`Usuario/Password no son correctos estado`
            })
        }
        const validarPassword=bcryptjs.compareSync(password, usuario.password);
        if (! validarPassword){
            return res.json({
                msg:`Usuario/Password no son correctos pass `
            }) 
        }

        const token = await generarJWT(usuario.id);

        return res.json({
           usuario,
           token
        })
    },

    usuarioPut: async (req, res) => {
        const { id } = req.params
        const { _id, createAt, estado, __v, email, rol, password, ...resto } = req.body

        if (password) {
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt)
        }

        const usuario = await Usuario.findByIdAndUpdate(id, resto)

        res.json({
            usuario
        })
    },

    usuarioPutActivar: async (req, res) => {
        const { id } = req.params

        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 })

        res.json({
            usuario
        })
    },

    usuarioPutDesactivar: async (req, res) => {
        const { id } = req.params

        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 })

        res.json({
            usuario
        })
    },
}
export default usuarioController