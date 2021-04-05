const validarListaClientes = async (tipo) =>{
    return (res,next)=>{
        if (tipo!="clientes"){
            return res.status(401).json({
                msg:`El servicio requiere de la Lista Clientes`
            })
        }
        next();
    }
    
}

export {validarListaClientes} 