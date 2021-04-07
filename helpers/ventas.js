import Venta from '../models/ventas.js'

const existeVentaById = async (id) => {
    const existe = await Venta.findById(id)
    
    if (!existe) throw new Error(`No existe venta con este ID` )
}

const validarArticulosDetalles = async (id,detalles) => {

}


export {existeVentaById, validarArticulosDetalles}