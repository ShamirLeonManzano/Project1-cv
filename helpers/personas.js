import Persona from '../models/personas.js'

const existePersonaById = async (id) =>{
    const existe = await Persona.findById(id)

    if(!existe) throw new Error('El ID no existe')
}

const existePersonaByNombre = async (nombre)=>{
    const existe = await Persona.findOne({nombre})

    if (existe) throw new Error ('Ya existe una Persona con ese nombre')
}

const existePersonaByNumDoc = async (numeroDocumento)=>{
    const existe = await Persona.findOne({numeroDocumento})

    if (existe) throw new Error ('Ya existe una Persona con ese número de documento')
}


export {existePersonaById,existePersonaByNombre,existePersonaByNumDoc}