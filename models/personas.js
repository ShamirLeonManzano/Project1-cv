import mongoose from 'mongoose'

const personaSchema = mongoose.Schema({
    tipoPersona: { type: String, required: true, maxlength: 20 },  //Cliente || Proveedor
    nombre: { type: String, required: true, maxlength: 50, unique: true },
    tipoDocumento: { type: String, required: true, maxlength:20},
    numeroDocumento: { type: String, required: true, unique: true, maxlength:20},
    direccion: { type: String, required: true, maxlength: 70 },
    telefono: { type: String, required: true, maxlength: 15 },
    email: { type: String, uniqued: true, maxlength: 50 },
    estado: { type: Number, default: 1 },// 1 =>Activo 0=>inactivo
    createAt: { type: Date, default: Date.now }

})

export default mongoose.model('Persona', personaSchema)