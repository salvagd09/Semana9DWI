package com.Proyecto.Semana9Backend.persistance;

import com.Proyecto.Semana9Backend.domain.Product;
import com.Proyecto.Semana9Backend.domain.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.Proyecto.Semana9Backend.persistance.crud.ProductoCrudRepository;
import com.Proyecto.Semana9Backend.persistance.entity.Producto;
import com.Proyecto.Semana9Backend.persistance.mapper.ProductMapper;

import java.util.List;
import java.util.Optional;

@Repository
public class ProductoRepository  implements ProductRepository {
    @Autowired
    private ProductoCrudRepository productoCrudRepository;
    //Variable nueva agregada
    @Autowired
    private ProductMapper mapper;
     //Funcion Actualizada
     @Override
    public List<Product> getAll(){
        List <Producto> productos  = (List<Producto>) productoCrudRepository.findAll();
        return  mapper.toProducts(productos);

    }
    //Funcion Actualizada
    @Override
    public Optional<List<Product>> getByCategory(int categoryId) {
         List <Producto> productos = productoCrudRepository.findByIdCategoriaOrderByNombreAsc(categoryId);
         return Optional.of( mapper.toProducts(productos));
    }

    //Funcion Actualizada
    @Override
    public Optional<List<Product>> getScarseProducts(int quantity) {
        Optional<List<Producto>>  productos = productoCrudRepository.findByCantidadStockLessThanAndEstado(quantity, true);
        return  productos.map(prods -> mapper.toProducts(prods));
    }
    //Funcion Actualizada
    @Override
    public Optional<Product> getProduct(int productId) {
        return productoCrudRepository.findById(productId).map(producto ->mapper.toProduct(producto));
    }
    //Funcion Actualizada
    @Override
    public Product save(Product product) {
         Producto producto = mapper.toProducto(product);
         return mapper.toProduct(productoCrudRepository.save(producto));
    }

    public void delete(int idProducto) {
        productoCrudRepository.deleteById(idProducto);
    }
}
