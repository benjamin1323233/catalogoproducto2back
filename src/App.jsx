import { BrowserRouter, Routes, Route } from "react-router";
import Administrador from "./components/pages/Administrador";
import DetalleProducto from "./components/pages/DetalleProducto";
import Error404 from "./components/pages/Error404";
import Inicio from "./components/pages/Inicio";
import Login from "./components/pages/Login";
import FormularioProducto from "./components/pages/producto/FormularioProducto";
import Footer from "./components/shared/Footer";
import Menu from "./components/shared/Menu";
import { useEffect, useState } from "react";
import ProtectorAdmin from "./components/routes/ProtectorAdmin";



function App() {
  const usuarioLogueado =
    JSON.parse(sessionStorage.getItem("userKey")) || {};
  const [usuarioAdmin, setUsuarioAdmin] = useState(usuarioLogueado);

   useEffect(()=>{
    sessionStorage.setItem('userKey', JSON.stringify(usuarioAdmin))
  }, [usuarioAdmin])

  const borrarProducto = (idProducto)=>{
    const productosFiltrados = productos.filter((itemProducto)=> itemProducto.id !==  idProducto)
    setProductos(productosFiltrados)
    return true
  }

  const buscarProducto = (idProducto)=>{
   const productobuscado = productos.find((itemProducto)=>itemProducto.id === idProducto)
   return productobuscado
  }
  
  const editarProducto =(idProducto, productoActualizado)=>{
  const productosEditados = productos.map((itemProducto)=>{
    if(itemProducto.id==idProducto){
      return{
        ...itemProducto,
        ...productoActualizado
      }
    }else{
      return itemProducto
    }
  }
)
//actualizar state

setProductos(productosEditados)
return true
  }

  return (
    <>
      <BrowserRouter>
        <Menu
          usuarioAdmin={usuarioAdmin}
          setUsuarioAdmin={setUsuarioAdmin}
        ></Menu>
        <main>
          <Routes>
            <Route path="/" element={<Inicio/>}></Route>
            <Route
              path="/detalle/:id"
              element={<DetalleProducto buscarProducto={buscarProducto}></DetalleProducto>}
            ></Route>
            <Route
              path="/login"
              element={<Login setUsuarioAdmin={setUsuarioAdmin}></Login>}
            ></Route>
            <Route
              path="/administrador"
              element={<ProtectorAdmin isAdmin={usuarioAdmin}></ProtectorAdmin>}
            >
              <Route index element={<Administrador borrarProducto={borrarProducto}></Administrador>}></Route>
              <Route path="crear" element={<FormularioProducto titulo={"crear producto"}></FormularioProducto>}></Route>
              <Route path="editar/:id" element={<FormularioProducto titulo={"editar producto"} buscarProducto={buscarProducto} editarProducto={editarProducto}></FormularioProducto>}></Route>
            </Route>
            <Route path="*" element={<Error404></Error404>}></Route>
          </Routes>
        </main>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
