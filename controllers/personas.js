import Persona from "../models/personas.js";

const personasControllers = {

    personaGet: async (req,res) => {
        const value = req.query.value;
        const persona = await Persona
                .find({
                $or: [
                    { nombre: new RegExp(value, 'i') },
                    { tipoPersona: new RegExp(value, 'i') },
                    { numeroDocumento: new RegExp (value, 'i')}
                ]
            })
            
            res.json({
                persona
            })
    },

    personaGetById: async (req,res) => {
        const {id} = req.params;
        const persona = await Persona.findOne({ _id:id})
        res.json({persona})
    },

    personaGetClientes: async (req,res) => {
        const {tipo} = req.params
        const clientes = await Persona.find({
            $or:[
                {tipoPersona:new RegExp (tipo,'i')}
            ]
        })
        res.json({
            clientes
        })
    },

    personaGetProveedores: async (req,res) => {
        const {tipo} = req.params
        const proveedor = await Persona.find({
            $or:[
                {tipoPersona:new RegExp (tipo,'i')}
            ]
        })
        res.json({
           proveedor
        })
    },

    personaPost: async (req,res) => {
        const {tipoPersona, nombre, tipoDocumento, numeroDocumento, direccion, telefono,email} = req.body;
        const persona = Persona({tipoPersona, nombre, tipoDocumento, numeroDocumento, direccion, telefono,email}); 

        await persona.save();

        res.json({
            persona
        })
    },

    personaPut: async (req,res) =>{
        const {id} = req.params
        const {_id, createAt,__v,...resto} = req.body

        const persona = await Persona.findByIdAndUpdate(id, resto);

        res.json({
            persona
        })
    },

    personaPutActivar: async (req,res) =>{
        const {id} = req.params
        const persona = await Persona.findByIdAndUpdate(id, {estado:1});

        res.json({
            persona
        })
    },

    personaPutDesactivar: async (req,res) =>{
        const {id} = req.params
        const persona = await Persona.findByIdAndUpdate(id, {estado:0});

        res.json({
            persona
        })
    },

    personaPutDelete: async (req,res) =>{
        const {id} = req.params
        const persona = await Persona.findByIdAndDelete(id);

        res.json({
            persona
        })
    }
}

export default personasControllers 

