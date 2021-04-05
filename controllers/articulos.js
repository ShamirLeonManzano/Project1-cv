import Articulo from "../models/articulos.js";

const articulosControllers = {

    articuloGet: async (req,res) => {
        const value = req.query.value;
        const articulo = await Articulo
            .find({
                $or:[
                    {nombre: new RegExp(value,'i')},
                    {descripcion: new RegExp(value,'i')}
                ]
            })
            .populate('categoria','nombre')
            .sort({'nombre':-1})
 
            res.json({
                articulo
            })
    },
    
    articuloGetById: async (req,res) => {
        const {id} = req.params
        const articulo = await Articulo.findOne({_id:id})
        res.json({
            articulo
        })
    },

    articuloGetByCategoria: async (req,res) => {
        const { id } = req.params
        const articulos = await Articulo.find({categoria:id})
        res.json({
            articulos
        })
    },

    articuloPost: async (req,res) => {
        const {codigo, categoria, nombre, descripcion, precioventa,stock} = req.body;
        const articulo = Articulo({codigo, categoria, nombre, descripcion, precioventa,stock}) 

        await articulo.save();

        res.json({
            articulo
        })
    },

    articuloPut: async (req,res) => {
        const {id} = req.params;
        const {_id, estado, createAt, __v,...resto} = req.body

        const articulo = await Articulo.findByIdAndUpdate(id,resto);

        res.json({
            articulo
        })
    },

    articuloPutActivar: async (req,res) => {
        const {id} = req.params;
        const articulo = await Articulo.findByIdAndUpdate(id,{estado:1})

        res.json({
            articulo
        })
    },

    articuloPutDesactivar: async (req,res) => {
        const {id} = req.params;
        const articulo = await Articulo.findByIdAndUpdate(id,{estado:0})

        res.json({
            articulo
        })
    },

    articuloDelete: async (req,res) => {
        const {id} = req.params;
        const articulo = await Articulo.findByIdAndDelete(id)

        res.json({
            articulo
        })
    },

}

export {articulosControllers}