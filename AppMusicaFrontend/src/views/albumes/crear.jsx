import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Crear() {
  const [datos, setDatos] = useState({
    titulo: '',
    tipo: 'LP',
    fechaLanzamiento: '',
    coverImageUrl: '',
    artista: '' // Aquí se guardará el ID seleccionado
  });
  const [artistas, setArtistas] = useState([]); // Estado para la lista de artistas
  const navigate = useNavigate();

  // 1. Cargar artistas al montar el componente
  useEffect(() => {
    const obtenerArtistas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/artistas'); // Ajusta a tu ruta real
        setArtistas(res.data);
      } catch (error) {
        console.error("Error cargando artistas", error);
      }
    };
    obtenerArtistas();
  }, []);

  const handleChange = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Recuperar el token (Esto faltaba en tu segundo código)
    const token = localStorage.getItem('token'); 

    try {
      // 2. Enviar los datos Y los headers con el token
      await axios.post('http://localhost:5000/api/albumes', datos, {
        headers: {
          'Authorization': token 
        }
      });
      
      alert("¡Álbum creado con éxito!");
      navigate('/listar');
    } catch (error) {
      console.error("Error del servidor:", error.response?.data);
      alert("Error: " + (error.response?.data?.error || "No autorizado"));
    }
  };

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <button onClick={() => navigate('/home')} style={{ marginBottom: '10px', cursor: 'pointer' }}>← Volver</button>
      <h2>Añadir Nuevo Álbum</h2>
      
      <form onSubmit={handleSubmit} style={estilos.form}>
        <input name="titulo" placeholder="Título del álbum" onChange={handleChange} style={estilos.input} required />
        
        <select name="tipo" onChange={handleChange} style={estilos.input}>
          <option value="LP">LP</option>
          <option value="EP">EP</option>
          <option value="Single">Single</option>
        </select>

        {/* 2. Selector de Artista en lugar de campo de texto */}
        <select name="artista" onChange={handleChange} style={estilos.input} required>
          <option value="">Selecciona un Artista</option>
          {artistas.map(art => (
            <option key={art._id} value={art._id}>{art.nombre}</option>
          ))}
        </select>

        <input name="fechaLanzamiento" type="date" onChange={handleChange} style={estilos.input} />
        <input name="coverImageUrl" placeholder="URL de la carátula" onChange={handleChange} style={estilos.input} />
        <button type="submit" style={estilos.boton}>Guardar Álbum</button>
      </form>
    </div>
  );
}

// ... tus estilos actuales
const estilos = {
  form: { background: '#282828', padding: '20px', borderRadius: '10px', marginBottom: '20px' },
  input: { display: 'block', width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#3e3e3e', color: 'white' },
  boton: { background: '#1DB954', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }
};