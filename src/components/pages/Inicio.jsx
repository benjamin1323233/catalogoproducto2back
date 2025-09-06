import { Container, Row, Form } from "react-bootstrap";
import CardProducto from "./producto/CardProducto";
import { useState, useEffect } from "react";
import { leerProductos } from "../../../helpers/queries";

const Inicio = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [listaProductos, setListaProductos] = useState([]);

  useEffect(() => {
    obtenerProductosback();
  }, []);

  const obtenerProductosback = async () => {
    const datos = await leerProductos();
    if (datos) {
      setListaProductos(datos);
    } else {
      console.info("ocurrio un error al buscar los productos");
    }
  };


  const handleInputChange = (e) => {
    console.log(e.target.value);
    setTerminoBusqueda(e.target.value);
  };
/*
  const productosFiltrados = listaProductos.filter((producto) =>
    producto.nombreProducto
      .toLowerCase()
      .includes(terminoBusqueda.toLowerCase())
  );
*/
  return (
    <section className="mainSection">
      <img
        className="banner"
        src="https://images.pexels.com/photos/13591748/pexels-photo-13591748.jpeg"
        alt="fondo cafe"
      />
      <Container className="mt-5">
        <h1 className="display-4">Nuestros Productos</h1>
        <hr />
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Buscar producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el nombre de un producto"
              onChange={handleInputChange}
              value={terminoBusqueda}
            />
          </Form.Group>
        </Form>
        <Row>
          {listaProductos.length > 0 ? (
            listaProductos.map((producto) => (
              <CardProducto
                key={producto._id}
                producto={producto}
              ></CardProducto>
            ))
          ) : (
            <p>No se encontraron productos para mostrar.</p>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Inicio;
