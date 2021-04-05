import mongoose from 'mongoose'

const comprasSchema = mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: `Usuario`, required: true },
    persona: { type: mongoose.Schema.Types.ObjectId, ref: `Persona`, required: true },
    tipo_comprobante: { type: String, maxlength:20 , required: true },
    serie_comprobante: { type: String, maxlength:7, required: true },
    num_comprobante: { type: String, maxlength:10, required: true },
    impuesto: { type: Number },
    total: { type: Number },
    detalles: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref:`Articulo`,required:true},
        articulo: {type: String, maxlength: 50, required:true},
        cantidad: { type: Number, required: true },
        precio: { type: Number, required: true, default: 0 },
    }],
    estado: { type: Number, default: 1 }, // 1 => Activo - 0 => inactivo
    createAt: { type: Date, default: Date.now }
})

export default mongoose.model('Compra', comprasSchema)