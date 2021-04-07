import Compra from "../models/compras.js"
import Articulo from "../models/articulos.js"

const increaseStock = async (id, cantidad)=>{

    let {stock}= await Articulo.findById(id);
    stock=parseInt(stock)+parseInt(cantidad)
    await Articulo.findByIdAndUpdate(id,{stock})
}
const reduceStock=async (id, cantidad)=>{
    let {stock}= await Articulo.findById(id);
    stock=parseInt(stock)-parseInt(cantidad)
    await Articulo.findByIdAndUpdate(id, {stock}) 
}


const compraControllers = {
    compraGet: async (req, res) =>{
        const value = req.query.value
        const compra = await Compra.find({
            $or:[
                {tipo_comprobante: new RegExp(value,'i')},
                {serie_comprobante: new RegExp(value,'i')},
                {num_comprobante: new RegExp(value,'i')}
            ]
        })
        
        res.json({
          compra
        })

    },

    compraGetById: async (req, res) => {
        const { id } = req.params;
        const compra = await Compra.findOne({ _id: id })
        res.json({
            compra
        })
    },

    compraPost: async (req,res) =>{
       const {usuario, persona, tipo_comprobante, serie_comprobante, num_comprobante, impuesto, total, detalles} = req.body;
       const compra = Compra ({usuario, persona, tipo_comprobante, serie_comprobante, num_comprobante, impuesto, total, detalles})
    
    
     detalles.map((articulo)=>increaseStock(articulo._id, articulo.cantidad))
    
    await compra.save();
        
        res.json({
           compra
       })
    },
    
    compraPutActivar: async (req, res) => {
        const { id } = req.params
        const compra = await Compra.findByIdAndUpdate(id, { estado: 1 })
        
        compra.detalles.map((articulo)=>increaseStock(articulo._id, articulo.cantidad))

        res.json({
            compra
        })
    },

    compraPutDesactivar: async (req, res) => {
        const { id } = req.params
        const compra = await Compra.findByIdAndUpdate(id, { estado: 0 })

        compra.detalles.map((articulo)=>reduceStock(articulo._id, articulo.cantidad))

        res.json({
            compra
        })
    },


}

export default compraControllers