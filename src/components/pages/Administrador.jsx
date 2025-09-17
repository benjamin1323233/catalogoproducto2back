import { Button, Table } from "react-bootstrap";
import ItemProducto from "./producto/ItemProducto";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { leerProductos } from "../../../helpers/queries";

const Administrador = ({  borrarProducto }) => {

 const [listaProductos,setlistaProductos]=useState([])

 useEffect(()=>{
  obtenerProductosback()
 },[])

const obtenerProductosback =async()=>{
  const respuesta = await leerProductos()
  if(respuesta.status === 200){
    const datos = await respuesta.json()
    setlistaProductos(datos)
  }else{
    console.info("ocurrio un error al buscar los productos")
  }
}
  return (
    <section className="container mainSection">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 ">Productos disponibles</h1>
        <div>
          <Link className="btn btn-primary" to={'/administrador/crear'}>
            <i className="bi bi-file-earmark-plus"></i>
          </Link>
        </div>
      </div>
      <hr />
      <Table responsive striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>Cod</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>URL de Imagen</th>
            <th>Categoria</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {
            listaProductos.map((producto, indice)=><ItemProducto key={producto._id} producto={producto} fila={indice + 1} borrarProducto={borrarProducto} setlistaProductos={setlistaProductos}></ItemProducto>)
          }
        </tbody>
      </Table>
    </section>
  );
};

export default Administrador;
