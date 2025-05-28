import React, { useState, useEffect } from 'react';
import Usuarios from './components/Usuarios';
import Productos from './components/Productos';
import ExportPDF from './components/ExportPDF';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
  const [activeTab, setActiveTab] = useState('usuarios');
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetchUsuarios();
    fetchProductos();
  }, []);

  const fetchUsuarios = async () => {
    const response = await axios.get('http://localhost:3000/usuarios');
    setUsuarios(response.data);
  };

  const fetchProductos = async () => {
    const response = await axios.get('http://localhost:3000/productos');
    setProductos(response.data);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '500px', borderRadius: '15px' }}>
        <h1 className="text-center mb-4" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Usuarios y Productos</h1>
        <div className="d-flex justify-content-center mb-4">
          <button
            className={`btn ${activeTab === 'usuarios' ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
            onClick={() => setActiveTab('usuarios')}
          >
            Usuarios
          </button>
          <button
            className={`btn ${activeTab === 'productos' ? 'btn-primary' : 'btn-outline-primary'} mx-2`}
            onClick={() => setActiveTab('productos')}
          >
            Productos
          </button>
        </div>
        <div className="w-100">
          {activeTab === 'usuarios' && <Usuarios />}
          {activeTab === 'productos' && <Productos />}
        </div>
        <ExportPDF usuarios={usuarios} productos={productos} />
      </div>
    </div>
  );
}

export default App;
