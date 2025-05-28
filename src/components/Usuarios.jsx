import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', email: '', edad: '' });
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    const response = await axios.get('http://localhost:3000/usuarios');
    setUsuarios(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editData) {
      await axios.put(`http://localhost:3000/usuarios/${editData.id}`, formData);
      setEditData(null);
    } else {
      await axios.post('http://localhost:3000/usuarios', formData);
    }
    fetchUsuarios();
    setFormData({ nombre: '', email: '', edad: '' });
  };

  const handleEdit = (usuario) => {
    setEditData(usuario);
    setFormData({ nombre: usuario.nombre, email: usuario.email, edad: usuario.edad });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/usuarios/${id}`);
    fetchUsuarios();
  };

  return (
    <div>
      <h2 className="text-center mb-4">Usuarios</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            placeholder="Edad"
            value={formData.edad}
            onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          {editData ? 'Actualizar' : 'Crear'}
        </button>
      </form>
      <ul className="list-group">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="list-group-item d-flex justify-content-between align-items-center">
            {usuario.nombre} - {usuario.email} - {usuario.edad}
            <div>
              <button className="btn btn-warning btn-sm mx-2" onClick={() => handleEdit(usuario)}>
                Editar
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(usuario.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
