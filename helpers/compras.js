// import { Error } from 'mongoose'
import Compra from '../models/compras.js'
import mongodb from 'mongodb'
import { check } from 'express-validator'
import Articulo from '../models/articulos.js'


const existeCompraById = async (id) => {
    const existe = await Compra.findById(id);
    
    if (!existe) throw new Error(`No existe Compra con ese ID`)
}

const existeArtDetId = async (id)=>{
    console.log(id);
    let existe = await Articulo.findById(id)

    if (!existe) throw new Error (`No Existe articulo con ese ID`)
}

const validarArticulosDetalles = async (detalles) => {
    detalles.map((articulo)=>existeArtDetId(articulo._id))
    let objectid= mongodb.ObjectID
    detalles.forEach(element => {
        if (!element._id) throw new Error ('El ID del articulo es obligatorio')  
        if (!objectid.isValid(element._id)) throw new Error ('El ID del articulo no es válido')
        if (!element.articulo) throw new Error ('El articulo es obligatorio')  
        if (!element.cantidad) throw new Error ('La cantidad del articulo es obligatoria')
        if (!element.precio) throw new Error ('El precio del articulo es obligatorio')
        
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



export {existeCompraById, validarArticulosDetalles,validarTipoComprobante,existeArtDetId}