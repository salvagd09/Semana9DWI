import { useState } from "react";
import './Modal.css'
function Modal({ children, onClose }) {
    return (
        <div 
            style={{
                position: "fixed", top: 0, left: 0,
                width: "100%", height: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex", justifyContent: "center", alignItems: "center",
                zIndex: 1000
            }}
            onClick={onClose} // Cierra al hacer clic fuera
        >
            <div 
                style={{
                    backgroundColor: "white", padding: "2rem",
                    borderRadius: "8px", minWidth: "400px",
                    maxWidth: "60%"
                }}
                onClick={(e) => e.stopPropagation()} // Evita que se cierre al clicar dentro
            >
                {children}
            </div>
        </div>
    );
}
// 1. Recibimos onClose y onProductAdded por props
export default function ModalAgregar({ onClose, onProductAdded }){
    // 2. Creamos los estados para capturar lo que el usuario escribe
    const [name, setName] = useState("");
    const [categoria, setCategoria] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await fetch("https://semana9dwi-mxln.onrender.com/products/save", {
                method: 'POST',
                body: JSON.stringify({ 
                    name: name, 
                    price: parseFloat(price) || 0,
                    categoryId: parseInt(categoria),
                    stock: parseInt(stock) || 0,
                    active:true,
                    category: {
                        categoryId: parseInt(categoria),
                        category: "",   
                        active: true    
                    }
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (respuesta.ok) {
                alert("Producto agregado de forma exitosa");
                if (onProductAdded) onProductAdded(); // Refresca la tabla automáticamente
                if (onClose) onClose(); // Cierra el modal
            } else {
                alert("Hubo un error en el servidor al intentar agregar");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error de red al conectar con el servidor");
        }
    };

    return(<>
    <Modal onClose={onClose}>
        <form onSubmit={handleSubmit}>
            <label htmlFor="nombreP">Ingresa el nombre del producto:</label>
            {/* 4. Conectamos value y onChange a cada input */}
            <input 
                type="text" 
                id="nombreP" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
            />

            <label>Selecciona la categoría:</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option value="">--Selecciona una opción</option>
                <option value="1">1-Frutas y verduras</option>
                <option value="2">2-Pastelería</option>
                <option value="3">3-Carnes y pescados</option>
                <option value="4">4-Lácteos y huevos</option>
                <option value="5">5-Bebidas</option>
                <option value="6">6-Licores</option>
                <option value="7">7-Cuidado personal</option>
                <option value="8">8-Despensa</option>
            </select>
            <label htmlFor="precioP">Ingresa el precio de venta del producto:</label>
            <input 
                type="number" 
                id="precioP" 
                step="0.01" 
                min="0" 
                max="100" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                required
            />

            <label htmlFor="stockP">Ingresa la cantidad de stock que tendrá el producto:</label>
            <input 
                type="number" 
                id="stockP" 
                value={stock} 
                onChange={(e) => setStock(e.target.value)}
            />

            <div className="acciones-modal">
                <button type="submit">Agregar producto</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </div>
        </form>
     </Modal>
    </>)
}
