import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CrearArtista() {
  const [datos, setDatos] = useState({ 
    nombre: '', 
    bio: '', 
    coverImageUrl: '', 
    generos: '' 
  });
  const [listaGeneros, setListaGeneros] = useState([]);
  const navigate = useNavigate();

  // Cargar géneros para el dropdown al montar el componente
  useEffect(() => {
    const obtenerGeneros = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/generos');
        setListaGeneros(res.data);
      } catch (error) {
        console.error("Error cargando géneros", error);
      }
    };
    obtenerGeneros();
  }, []);

  const handleChange = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  try {
    await axios.post('http://localhost:5000/api/artistas', datos, {
      headers: { 'Authorization': token } 
    });
    alert("Artista creado");
    navigate('/listarArtista');
  } catch (error) {
    alert("Error de autorización o datos inválidos");
  }
};

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <button 
        onClick={() => navigate('/listarArtista')} 
        style={{ marginBottom: '10px', cursor: 'pointer', background: '#333', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}
      >
        ← Volver
      </button>

      <h2>Añadir Nuevo Artista</h2>
      
      <form onSubmit={handleSubmit} style={estilos.form}>
        <input 
          name="nombre" 
          placeholder="Nombre del artista" 
          onChange={handleChange} 
          style={estilos.input} 
          required 
        />
        
        <textarea 
          name="bio" 
          placeholder="Biografía o descripción" 
          onChange={handleChange} 
          style={{ ...estilos.input, minHeight: '80px', resize: 'vertical' }} 
        />

        <select 
          name="generos" 
          onChange={handleChange} 
          style={estilos.input} 
          required
        >
          <option value="">Selecciona un Género Principal</option>
          {listaGeneros.map(g => (
            <option key={g._id} value={g._id}>{g.nombre}</option>
          ))}
        </select>

        <input 
          name="coverImageUrl" 
          placeholder="URL de la imagen de perfil (opcional)" 
          onChange={handleChange} 
          style={estilos.input} 
        />

        <button type="submit" style={estilos.boton}>Guardar Artista</button>
      </form>
    </div>
  );
}

const estilos = {
  form: { 
    background: '#282828', 
    padding: '20px', 
    borderRadius: '10px', 
    marginBottom: '20px' 
  },
  input: { 
    display: 'block', 
    width: '100%', 
    marginBottom: '10px', 
    padding: '10px', 
    borderRadius: '4px', 
    border: 'none', 
    backgroundColor: '#3e3e3e', 
    color: 'white',
    fontFamily: 'inherit'
  },
  boton: { 
    background: '#1DB954', 
    color: 'white', 
    border: 'none', 
    padding: '10px 20px', 
    borderRadius: '20px', 
    cursor: 'pointer', 
    fontWeight: 'bold', 
    width: '100%' 
  }
};