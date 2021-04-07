import Venta from "../models/ventas.js"
import Articulo from "../models/articulos.js"

const increaseStock = async (id, cantidad)=>{
    let {stock}= await Articulo.findById(id);
    stock=parseInt(stock)+parseInt(cantidad)
    await Articulo.findByIdAndUpdate(id, {stock})
    
}
    const reduceStock=async (id, cantidad)=>{
    let {stock}= await Articulo.findById(id);
    stock=parseInt(stock)-parseInt(cantidad)
    await Articulo.findByIdAndUpdate(id, {stock})

}
const ventasControllers = {

    ventaGet: async (req, res) =>{
        const value = req.query.value
        const venta = await Venta.find({
            $or:[
                {tipo_comprobante: new RegExp(value,'i')},
                {serie_comprobante: new RegExp(value,'i')},
                {num_comprobante: new RegExp(value,'i')}
            ]
        })
        
        res.json({
          venta
        })

    },

    ventaGetById: async (req, res) => {
        const { id } = req.params;
        const venta = await Venta.findOne({ _id: id })
        res.json({
            venta
        })
    },
    ventaPost: async (req,res) =>{
       const {usuario, persona, tipo_comprobante, serie_comprobante, num_comprobante, impuesto, total, detalles, descuento} = req.body;
       const venta = Venta ({usuario, persona, tipo_comprobante, serie_comprobante, num_comprobante, impuesto, total, detalles, descuento});

       await venta.save();

       detalles.map((articulo)=>reduceStock(articulo._id, articulo.cantidad))

       
       res.json({
           venta
       })
    },

    ventaPutActivar: async (req, res) => {
        const { id } = req.params
        const venta = await Venta.findByIdAndUpdate(id, { estado: 1 })

        venta.detalles.map((articulo)=>reduceStock(articulo._id, articulo.cantidad))

        res.json({
            venta
        })
    },

    ventaPutDesactivar: async (req, res) => {
        const { id } = req.params
        const venta = await Venta.findByIdAndUpdate(id, { estado: 0 })

        venta.detalles.map((articulo)=>increaseStock(articulo._id, articulo.cantidad))

        res.json({
            venta
        })
    },


}

export default ventasControllers