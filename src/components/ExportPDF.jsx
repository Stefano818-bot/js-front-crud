import React from 'react';
import { jsPDF } from 'jspdf';

function ExportPDF({ usuarios, productos }) {
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text('Listado de Usuarios', 10, 10);

    // Usuarios
    doc.setFontSize(12);
    usuarios.forEach((usuario, index) => {
      doc.text(`${index + 1}. Nombre: ${usuario.nombre}, Edad: ${usuario.edad}`, 10, 20 + index * 10);
    });

    // Espaciado
    const usuariosHeight = 20 + usuarios.length * 10;
    doc.text('Listado de Productos', 10, usuariosHeight + 10);

    // Productos
    productos.forEach((producto, index) => {
      doc.text(`${index + 1}. Nombre: ${producto.name}, Precio: $${producto.price}`, 10, usuariosHeight + 20 + index * 10);
    });

    // Guardar el PDF
    doc.save('listado.pdf');
  };

  return (
    <button className="btn btn-info mt-4" onClick={exportToPDF}>
      Exportar PDF
    </button>
  );
}

export default ExportPDF;
