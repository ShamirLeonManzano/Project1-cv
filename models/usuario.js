import mongoose from 'mongoose'

const UsuarioSchema = mongoose.Schema({
    nombre: { type: String, required: true, maxlength: 50 },
    email: { type: String, uniqued: true, maxlength: 50 },
    password: { type: String, required: true },
    rol: { type: String, required: true, maxlength: 20 },
    //ADMIN_ROL  -  VENDEDOR_ROL  -  ALMACENISTA_ROL
    estado: { type: Number, default: 1 },
    createAt: { type: Date, default: Date.now }
})

export default mongoose.model('Usuario', UsuarioSchema)