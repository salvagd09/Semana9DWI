import { useState } from 'react';
import './App.css';
import BotonAgregar from './components/BotonAgregar';
import BotonEliminar from './components/BotonEliminar';
import ProductList from './components/ProductList';
import ModalEliminar from './components/ModalEliminar'; 
import ModalAgregar from './components/ModalAgregar';
function App() {
  const [modalActivo, setModalActivo] = useState(null);
  const [triggerRefresco, setTriggerRefresco] = useState(null);
  const cerrarModal = () => setModalActivo(null);
  return (
    <>
      <div className="App">
        <h1>Tienda UTP</h1>
        {/* Capturamos la función interna de ProductList y la guardamos */}
        <ProductList onLoadRef={setTriggerRefresco} />
      </div>

      <div className="botones">
        <BotonAgregar onClick={() => setModalActivo("agregar")} />
        <BotonEliminar onClick={() => setModalActivo("eliminar")} />
      </div>

      {modalActivo === "eliminar" && (
        <ModalEliminar 
          onClose={cerrarModal} 
          // Pasamos la función de refresco al modal
          onProductDeleted={() => {  if (triggerRefresco) triggerRefresco(); }} 
        />
      )}
      {modalActivo === "agregar" && (
        <ModalAgregar 
          onClose={cerrarModal} 
           onProductAdded={() => {  if (triggerRefresco) triggerRefresco(); }} 
        />
      )} 
    </>
  );
}

export default App;
