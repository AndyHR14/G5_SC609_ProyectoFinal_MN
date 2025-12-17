import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function Listar() {
    const navigate = useNavigate();
  const [albumes, setAlbumes] = useState([]);
  const [busqueda, setBusqueda] = useState(""); 
  const [cargando, setCargando] = useState(false);

  // Usamos el método getAll que añadimos al controlador
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
    } catch (error) {
      alert("No se pudo eliminar el álbum");
    }
  };

  const buscarAlbumes = async (e) => {
    if(e) e.preventDefault();
    setCargando(true);
    try {
      const respuesta = await axios.post('http://localhost:5000/api/albumes/search', {
        text: busqueda
      });
      setAlbumes(respuesta.data);
    } catch (error) {
      console.error("Error al buscar:", error);
    } finally {
      setCargando(false);
    }
  }
  useEffect(() => {
    buscarAlbumes();
  }, []);

  useEffect(() => { cargarAlbumes(); }, []);

  return (
        <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
    

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button 
        onClick={() => navigate('/')} 
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
        ← Volver al Home
      </button>
      
      <h1>Mis Albumes</h1>

      <button 
        onClick={() => navigate('/crear')} 
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
        + Crear Album
      </button>
    </div>

      <div style={estilos.grid}>
        <form onSubmit={buscarAlbumes} style={{ marginBottom: '20px', marginTop: '20px' }}>
        <input
          type="text" 
          placeholder="Buscar por título..." 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ padding: '10px', width: '250px', borderRadius: '5px', border: 'none' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer', borderRadius: '5px', border: 'none', backgroundColor: '#1DB954', color: 'white' }}>
          Buscar
        </button>
      </form>
        {albumes.map(album => (
          <div key={album._id} style={estilos.tarjeta}>
            <img src={album.coverImageUrl} alt={album.titulo} style={{ width: '100px' }} />
            <h3>{album.titulo}</h3>
            <p>Tipo: {album.tipo}</p>
             <button 
                onClick={() => navigate(`/borrar`)} 
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
  tarjeta: { 
    background: '#181818', 
    padding: '15px', 
    borderRadius: '10px', 
    textAlign: 'center',
    border: '1px solid #333'
  }
};