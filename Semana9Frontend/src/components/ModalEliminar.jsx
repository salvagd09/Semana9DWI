import {useState } from "react";
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
                    maxWidth: "90%"
                }}
                onClick={(e) => e.stopPropagation()} // Evita que se cierre al clicar dentro
            >
                {children}
            </div>
        </div>
    );
}
export default function ModalEliminar({onClose,onProductDeleted}){
    const [pEliminar,setPEliminar]=useState("")
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            // Se recomienda usar el método DELETE si tu backend lo requiere
            const res = await fetch(`https://semana9dwi-mxln.onrender.com/products/delete/${pEliminar}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json'
                }
            });

            if (res.ok) {
                alert("La eliminación fue exitosa");
                 if (onProductDeleted) onProductDeleted(); 
                 if (onClose) onClose(); 
            } else {
                alert("Hubo un error al eliminar el producto");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un error de red al intentar conectar con el servidor");
    }
    } 
    return(<>
     <Modal onClose={onClose}>
        <form onSubmit={handleSubmit}>
            <label htmlFor="idEliminar">Ingresa el número de  ID del producto</label>
            <input type="number" id="idEliminar" value={pEliminar} onChange={(e) => setPEliminar(e.target.value)}/>
            <div className="acciones-modal">
                <button type="submit" className="btnEliminar">Eliminar
                </button><button type="button" onClick={onClose}>Cancelar</button>
            </div>
        </form>
     </Modal>
    </>)
}
