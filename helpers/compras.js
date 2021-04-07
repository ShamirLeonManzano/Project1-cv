import Compra from '../models/compras.js'

const existeCompraById = async (id) => {
    const existe = await Compra.findById(id)
    
    if (!existe) throw new Error(`No existe Compra con ese ID`)
}

export {existeCompraById}