import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Buscar() {
  const [busqueda, setBusqueda] = useState('')
  const [canciones, setCanciones] = useState([])
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate();

  const buscarCanciones = async (e) => {
    if(e) e.preventDefault();
    setCargando(true);
    try {
      const respuesta = await axios.post('http://localhost:5000/api/canciones/search', {
        text: busqueda
      });
      setCanciones(respuesta.data);
    } catch (error) {
      console.error("Error al buscar:", error);
    } finally {
      setCargando(false);
    }
  }
  useEffect(() => {
    buscarCanciones();
  }, []);

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
      <h1>Mis Canciones</h1>
      
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

      <form onSubmit={buscarCanciones} style={{ marginBottom: '20px', marginTop: '20px' }}>
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

      <hr style={{ borderColor: '#333' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {cargando ? <p>Buscando canciones...</p> : 
          canciones.map((cancion) => (
            <div key={cancion._id} style={{ background: '#181818', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
              <img src={cancion.coverImageUrl} alt={cancion.titulo} style={{ width: '100%', borderRadius: '5px' }} />
              <h3 style={{ margin: '10px 0 5px 0' }}>{cancion.titulo}</h3>
              <p style={{ color: '#b3b3b3', fontSize: '14px' }}>Álbum: {cancion.album?.titulo}</p>
              <audio controls style={{ width: '100%', marginTop: '10px' }}>
                <source src={cancion.cloudinarySecureUrl} type="audio/mpeg" />
              </audio>
              
              <button 
                onClick={() => navigate(`/eliminar`)} 
                style={{ marginTop: '15px', backgroundColor: '#f6fa05ff', color: 'black', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
              >
                Eliminar
              </button>

            </div>
          ))
        }
      </div>

      {!cargando && canciones.length === 0 && <p>No se encontraron canciones.</p>}
    </div>

  )


}