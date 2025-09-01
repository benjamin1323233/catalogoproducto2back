//get,post,put,delete
const urlProductos= import.meta.env.VITE_API_PRODUCTOS
console.log(urlProductos)
export const leerProductos = async () => {
  try {
    const respuesta = await fetch(urlProductos);

    if (!respuesta.ok) {
      throw new Error("Error HTTP: " + respuesta.status);
    }

    const datos = await respuesta.json(); // <-- acá convertís la respuesta en JSON
    return datos;
  } catch (error) {
    console.error("Error en leerProductos:", error);
    return null;
  }
};

export const obtenerProductoPorId =async(id)=>{
    try{
const respuesta = await fetch(urlProductos+`/${id}`)
return respuesta
    }catch(error){
console.log(error)
return null
    }
}
export const CrearProducto=async(productoNuevo)=>{
    try{
const respuesta = await fetch(urlProductos,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body: JSON.stringify(productoNuevo)
})
return respuesta
    }catch(error){
console.log(error)
return null
    }
}

export const editarProducto=async(ProductoEditado,id)=>{
    try{
const respuesta = await fetch(urlProductos+`/${id}`,{
method:"PUT",
    headers:{
        "Content-Type":"application/json"
    },
    body: JSON.stringify(ProductoEditado)
})

return respuesta
    }catch(error){
console.log(error)
return null
    }
}
export const BorrarProductoid=async(id)=>{
    try{
const respuesta = await fetch(urlProductos+`/${id}`,{
method:"DELETE"
})
return respuesta
    }catch(error){
console.log(error)
return null
    }
}
