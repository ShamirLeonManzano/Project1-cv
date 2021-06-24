import { check } from 'express-validator'
import Venta from '../models/ventas.js'

const existeVentaById = async (id) => {
    const existe = await Venta.findById(id)
    
    if (!existe) throw new Error(`No existe venta con este ID` )
}

const validarArticulosDetalles = async (detalles) => {
        detalles.forEach(element => {
            if (!element._id) throw new Error ('El ID del articulo es obligatorio')  
           else if (!element.articulo) throw new Error ('El articulo es obligatorio')  
           else if (!element.cantidad) throw new Error ('La cantidad del articulo es obligatoria')
           else if (!element.precio) throw new Error ('El precio del articulo es obligatorio')
        });
     
}

const validarTipoComprobante = async (tipo_comprobante) =>{
    if ( tipo_comprobante != "FACTURA"   ){
        if (tipo_comprobante != "NOTA DEBITO"){
            if (tipo_comprobante != "NOTA CREDITO"){
                throw new Error (`El tipo de comprobante es requerido con los siguientes valores: FACTURA, NOTA DEBITO, NOTA CREDITO`)
            }
        }
    }
}


export {existeVentaById, validarArticulosDetalles,validarTipoComprobante} 