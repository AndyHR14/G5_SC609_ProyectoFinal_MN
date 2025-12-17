import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EliminarGenero() {
  const navigate = useNavigate();
  const [generos, setGeneros] = useState([]);

  const cargarGeneros = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/generos');
      setGeneros(res.data);
    } catch (error) {
      console.error("Error al cargar géneros");
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este género?")) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/generos/${id}`, {
        headers: { 'Authorization': token }
      });
      cargarGeneros();
      alert("Genero Eliminado");
    } catch (error) {
      alert("No se pudo eliminar el género");
    }
  };

  useEffect(() => { cargarGeneros(); }, []);

  return (
    <div style={{ padding: '30px', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={() => navigate('/listarGenero')} style={estilos.botonVolver}>← Volver</button>
        <h1>Géneros Musicales</h1>
        <button onClick={() => navigate('/crearGenero')} style={estilos.botonCrear}>+ Crear Género</button>
      </div>

      <div style={estilos.grid}>
        {generos.map(g => (
          <div key={g._id} style={estilos.tarjeta}>
            <h3 style={{ color: '#1DB954' }}>{g.nombre}</h3>
            <p style={{ fontSize: '14px', color: '#b3b3b3' }}>{g.descripcion || 'Sin descripción'}</p>
            <button onClick={() => eliminar(g._id)} style={estilos.botonEliminar}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const estilos = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' },
  tarjeta: { background: '#181818', padding: '20px', borderRadius: '10px', textAlign: 'center', border: '1px solid #333' },
  botonVolver: { padding: '8px 15px', borderRadius: '5px', backgroundColor: '#333', color: 'white', border: 'none', cursor: 'pointer' },
  botonCrear: { padding: '10px 20px', borderRadius: '20px', backgroundColor: '#1DB954', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' },
  botonEliminar: { marginTop: '15px', backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '8px', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }
};