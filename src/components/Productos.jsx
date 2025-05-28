import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '' });
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const response = await axios.get('http://localhost:3000/productos');
    setProductos(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editData) {
      await axios.put(`http://localhost:3000/productos/${editData.id}`, formData);
      setEditData(null);
    } else {
      await axios.post('http://localhost:3000/productos', formData);
    }
    fetchProductos();
    setFormData({ name: '', price: '' });
  };

  const handleEdit = (producto) => {
    setEditData(producto);
    setFormData({ name: producto.name, price: producto.price });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/productos/${id}`);
    fetchProductos();
  };

  return (
    <div>
      <h2 className="text-center">Productos</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="number"
          placeholder="Precio"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-success">
          {editData ? 'Actualizar' : 'Crear'}
        </button>
      </form>
      <ul className="list-group">
        {productos.map((producto) => (
          <li key={producto.id} className="list-group-item d-flex justify-content-between align-items-center">
            {producto.name} - ${producto.price}
            <div>
              <button className="btn btn-warning btn-sm mx-2" onClick={() => handleEdit(producto)}>
                Editar
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(producto.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Productos;
