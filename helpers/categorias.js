import Categoria from "../models/categoria.js"

const existeCategoriaById = async (id) => {
    const existe = await Categoria.findById(id)

    if (!existe) throw new Error(`El ID no existe`)
}

const existeCategoriaByNombre = async (nombre) => {
    const existe = await Categoria.findOne({ nombre })

    if (existe) throw new Error(`Ya existe una categoria con ese nombre`)
}
export { existeCategoriaById, existeCategoriaByNombre }