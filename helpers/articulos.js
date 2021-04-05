
import Articulo from "../models/articulos.js"

const existeArticuloById = async (id) =>{
    const existe = await Articulo.findById(id)

    if(!existe) throw new Error('El ID no existe')
}

const existeArticuloByNombre = async (nombre)=>{
    const existe = await Articulo.findOne({nombre})

    if (existe) throw new Error ('Ya existe un Articulo con ese nombre')
}


export {existeArticuloById, existeArticuloByNombre}

