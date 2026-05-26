import { useEffect, useState,useCallback } from "react";
function ProductList({ onLoadRef }) {
    const [productos, setProductos] = useState([]);
    const cargarProductos = useCallback(() => {
        fetch("https://semana9dwi-mxln.onrender.com/products/all")
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(err => console.error("Error al cargar:", err));
    }, []);
    useEffect(() => {
        cargarProductos();
    }, [cargarProductos]);
    useEffect(() => {
        if (onLoadRef) {
            onLoadRef(() => cargarProductos);
        }
    }, [onLoadRef, cargarProductos]);
    return (
        <div>
            <h2>Lista de productos</h2>
            <table>
                <thead>
                    <tr>            
                        <th>ID del Producto</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(p => (
                        <tr key={p.productId}>
                            <td>{p.productId}</td>
                            <td>{p.name}</td>
                            <td>S/.{p.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
