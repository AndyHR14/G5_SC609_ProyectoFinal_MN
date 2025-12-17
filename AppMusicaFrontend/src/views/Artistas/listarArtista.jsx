import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ListarArtistas() {
  const navigate = useNavigate();
  const [artistas, setArtistas] = useState([]);

  // Cargar la lista de artistas desde el backend
  const cargarArtistas = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/artistas');
      setArtistas(res.data);
    } catch (error) {
      console.error("Error al cargar artistas");
    }
  };

  // Función para eliminar con token de seguridad
  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este artista?")) return;
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/artistas/${id}`, {
        headers: { 'Authorization': token }
      });
      cargarArtistas(); // Recargar la lista tras eliminar
    } catch (error) {
      alert("No se pudo eliminar el artista");
    }
  };

  useEffect(() => { cargarArtistas(); }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
      
      {/* Cabecera idéntica a la de Álbumes */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/')} 
          style={estilos.botonVolver}
        >
          ← Volver al Home
        </button>
        
        <h1>Mis Artistas</h1>

        <button 
          onClick={() => navigate('/crearArtista')} 
          style={estilos.botonCrear}
        >
          + Crear Artista
        </button>
      </div>

      {/* Grid de tarjetas */}
      <div style={estilos.grid}>
        {artistas.map(art => (
          <div key={art._id} style={estilos.tarjeta}>
            {/* Se eliminó la imagen por solicitud */}
            <h3 style={{ fontSize: '1.4rem', margin: '10px 0' }}>{art.nombre}</h3>
            <p style={{ color: '#b3b3b3' }}>
              Género: {art.generos?.[0]?.nombre || 'Sin género'}
            </p>
            <p style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>
               Seguidores: {art.seguidores || 0}
            </p>
            
            <button 
                onClick={() => navigate(`/eliminarArtista`)} 
                style={{ marginTop: '15px', backgroundColor: '#f6fa05ff', color: 'black', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
              >
                Eliminar
              </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const estilos = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '20px'
  },
  tarjeta: { 
    background: '#181818', 
    padding: '20px', 
    borderRadius: '10px', 
    textAlign: 'center',
    border: '1px solid #333',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  botonVolver: { 
    padding: '8px 15px', 
    borderRadius: '5px', 
    backgroundColor: '#333', 
    color: 'white', 
    border: 'none', 
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  botonCrear: { 
    padding: '10px 20px', 
    borderRadius: '20px', 
    backgroundColor: '#1DB954', 
    color: 'white', 
    border: 'none', 
    cursor: 'pointer', 
    fontWeight: 'bold' 
  },
  botonEliminar: {
    marginTop: '15px',
    backgroundColor: '#ff4444', 
    color: 'white',
    border: 'none',
    padding: '8px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    fontWeight: 'bold'
  }
};