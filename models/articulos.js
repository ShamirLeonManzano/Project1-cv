import mongoose from 'mongoose'

const articuloSchema = mongoose.Schema({
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: `Categoria`, require: true },
    codigo: { type: String, require: true, maxlength: 64, unique: true },
    nombre: { type: String, require: true, maxlength: 50, unique: true },
    descripcion: { type: String, maxlength: 255 },
    precioventa: { type: Number, default: 0},
    stock: { type: Number, default: 1 },
    estado: { type: Number, default: 1 },// 1 =>Activo 0=>inactivo
    createAt: { type: Date, default: Date.now }
})

export default mongoose.model('Articulo', articuloSchema)