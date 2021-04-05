import Compra from '../models/compras.js'

const existeCompraById = async (id) => {
    const existe = await Compra.findById(id)
    
    if (!existe) throw new Error('El ID no existe')
}

export {existeCompraById}