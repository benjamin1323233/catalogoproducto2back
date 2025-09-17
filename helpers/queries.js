//get,post,put,delete
const urlProductos= import.meta.env.VITE_API_PRODUCTOS
const urlusuarios = import.meta.env.VITE_API_USUARIOS
export const leerProductos=async()=>{
    try{
const respuesta = await fetch(urlProductos)
return respuesta
    }catch(error){
console.error(error)
return null
    }
}
export const obtenerProductoPorId =async(id)=>{
    try{
const respuesta = await fetch(urlProductos+`/${id}`)
return respuesta
    }catch(error){
console.error(error)
return null
    }
}
export const CrearProducto=async(productoNuevo)=>{
    try{
const respuesta = await fetch(urlProductos,{
    method:"POST",
    headers:{
        "Content-Type":"application/json",
                "x-token":JSON.parse(sessionStorage.getItem("userKey")).token
    },
    body: JSON.stringify(productoNuevo)
})
return respuesta
    }catch(error){
console.error(error)
return null
    }
}

export const editarProducto=async(ProductoEditado,id)=>{
    try{
const respuesta = await fetch(urlProductos+`/${id}`,{
method:"PUT",
    headers:{
        "Content-Type":"application/json",
        "x-token":JSON.parse(sessionStorage.getItem("userKey")).token
    },
    body: JSON.stringify(ProductoEditado)
})

return respuesta
    }catch(error){
console.error(error)
return null
    }
}
//en clase lo verde, abajo lo que funciona

export const BorrarProductoid=async(id)=>{
    try{
const respuesta = await fetch(urlProductos+`/${id}`,{
method:"DELETE",
headers:{
        "x-token":JSON.parse(sessionStorage.getItem("userKey")).token
    },
})
return respuesta
    }catch(error){
console.error(error)
return 500
    }
}

export const Loginuser=async(datosUsuario)=>{
    try{
const respuesta = await fetch(urlusuarios+"/login",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body: JSON.stringify(datosUsuario)
})
return respuesta
    }catch(error){
console.error(error)
return null
    }
}

