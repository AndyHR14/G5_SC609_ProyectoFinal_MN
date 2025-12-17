import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function Borrar() {
    const navigate = useNavigate();
  const [albumes, setAlbumes] = useState([]);

  const cargarAlbumes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/albumes');
      setAlbumes(res.data);
    } catch (error) {
      console.error("Error al cargar álbumes");
    }
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar este álbum?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/albumes/${id}`);
      cargarAlbumes();
      alert("Album Eliminado");
    } catch (error) {
      alert("No se pudo eliminar el álbum");
    }
  };

  useEffect(() => { cargarAlbumes(); }, []);

  return (
        <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
    

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button 
        onClick={() => navigate('/listar')} 
        style={{ 
          padding: '8px 15px', 
          borderRadius: '5px', 
          backgroundColor: '#333', 
          color: 'white', 
          border: 'none', 
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        ← Volver
      </button>
      
      <h1>Mis bumes</h1>

      <button 
        onClick={() => navigate('/subir')} 
        style={{ 
          padding: '10px 20px', 
          borderRadius: '20px', 
          backgroundColor: '#1DB954', 
          color: 'white', 
          border: 'none', 
          cursor: 'pointer', 
          fontWeight: 'bold' 
        }}
      >
        + Subir Canción
      </button>
    </div>
    
      <div style={estilos.grid}>
        {albumes.map(album => (
          <div key={album._id} style={estilos.tarjeta}>
            <img src={album.coverImageUrl} alt={album.titulo} style={{ width: '100px' }} />
            <h3>{album.titulo}</h3>
            <p>Tipo: {album.tipo}</p>
            <button onClick={() => eliminar(album._id)} style={estilos.botonEliminar}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
const estilos = {
  tarjeta: { 
    background: '#181818', 
    padding: '15px', 
    borderRadius: '10px', 
    textAlign: 'center',
    border: '1px solid #333'
  },
  botonEliminar: {
    marginTop: '15px',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%'
  }
};