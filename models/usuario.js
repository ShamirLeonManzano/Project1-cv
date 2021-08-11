import mongoose from 'mongoose'

const UsuarioSchema = mongoose.Schema({
    nombre: { type: String, required: true, maxlength: 50 },
    email: { type: String, uniqued: true, maxlength: 50 },
    password: { type: String, required: true },
    rol: { type: String, required: true, maxlength: 20 },
    //ADMIN_ROL  -  VENDEDOR_ROL  -  ALMACENISTA_ROL
    tipoDocumento: { type: String, required: true, maxlength:20},
    numeroDocumento: { type: String, required: true, unique: true, maxlength:20},
    direccion: { type: String, required: true, maxlength: 70 },
    telefono: { type: String, required: true, maxlength: 15 },
    estado: { type: Number, default: 1 },
    createAt: { type: Date, default: Date.now }
})

export default mongoose.model('Usuario', UsuarioSchema)