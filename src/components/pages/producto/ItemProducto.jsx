import { Button } from "react-bootstrap";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { BorrarProductoid, leerProductos } from "../../../../helpers/queries";
const ItemProducto = ({ producto, fila, setlistaProductos }) => {
  const eliminarProducto = () => {
    Swal.fire({
      title: "Eliminar producto",
      text: "No puedes revertir este paso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#146c43",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async(result) => {
      if (result.isConfirmed) {
        // aqui borro efectivamente el producto
        const respuesta = await BorrarProductoid(producto._id)
        if(respuesta.status===200){
          Swal.fire({
            title: "Producto eliminado",
            text: `El producto ${producto.nombreProducto} fue eliminado correctamente`,
            icon: "success",
          });
          //luego debo actualizar la tabla de productos
          const respuestaProductos = await leerProductos()
          const productosActualizados = await respuestaProductos.json()
          setlistaProductos(productosActualizados)
        }else{
            Swal.fire({
            title: "Ocurrio un error",
            text: `El producto ${producto.nombreProducto} no pudo ser eliminado.`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <tr>
      <td className="text-center">{fila}</td>
      <td>{producto.nombreProducto}</td>
      <td className="text-end">${producto.precio}</td>
      <td className="text-center">
        <img
          src={producto.imagen}
          className="img-thumbnail"
          alt={producto.nombreProducto}
        ></img>
      </td>
      <td>{producto.categoria}</td>
      <td className="text-center">
        <Link className="me-lg-2 btn btn-warning" to={`/administrador/editar/`+producto.id} >
          <i className="bi bi-pencil-square"></i>
        </Link>
        <Button variant="danger" onClick={eliminarProducto}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemProducto;
