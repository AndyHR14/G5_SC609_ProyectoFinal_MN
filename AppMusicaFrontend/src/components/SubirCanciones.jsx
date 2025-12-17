import { useState, useEffect } from 'react';
import axios from 'axios';

function SubirCanciones({ alFinalizar }) {
  const [datos, setDatos] = useState({
    titulo: '',
    album: '',
    generos: '', 
    fechaLanzamiento: '',
    coverImageUrl: ''
  });
  
  const [albumes, setAlbumes] = useState([]);
  const [listaGeneros, setListaGeneros] = useState([]); 
  const [archivo, setArchivo] = useState(null);
  const [subiendo, setSubiendo] = useState(false);

  // Cargar álbumes y géneros al montar el componente
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const [resAlbumes, resGeneros] = await Promise.all([
          axios.get('http://localhost:5000/api/albumes'),
          axios.get('http://localhost:5000/api/generos') 
        ]);
        setAlbumes(resAlbumes.data);
        setListaGeneros(resGeneros.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    cargarDatosIniciales();
  }, []);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivo) return alert("Por favor selecciona un archivo de audio");
    if (!datos.album || !datos.generos) return alert("Selecciona álbum y género");

    setSubiendo(true);

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('titulo', datos.titulo);
    formData.append('album', datos.album);
    formData.append('generos', datos.generos); 
    formData.append('fechaLanzamiento', datos.fechaLanzamiento);
    formData.append('coverImageUrl', datos.coverImageUrl);
    formData.append('cancion', archivo);

    try {
      await axios.post('http://localhost:5000/api/canciones/upload', formData, {
       headers: { 
        'Content-Type': 'multipart/form-data',
        'Authorization': token
      }
      });
      alert("¡Canción subida con éxito!");
      alFinalizar();
    } catch (error) {
      console.error("Error al subir:", error.response?.data || error.message);
      alert("Error al subir la canción");
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={estilos.form}>
      <h3>Subir Nueva Canción</h3>
      <input name="titulo" placeholder="Título" onChange={handleChange} required style={estilos.input} />
      
      {/* Dropdown de Álbumes */}
      <select name="album" onChange={handleChange} value={datos.album} required style={estilos.input}>
        <option value="">Selecciona un álbum...</option>
        {albumes.map((alb) => (
          <option key={alb._id} value={alb._id}>{alb.titulo}</option>
        ))}
      </select>

      {/* Dropdown de Géneros */}
      <select name="generos" onChange={handleChange} value={datos.generos} required style={estilos.input}>
        <option value="">Selecciona un género...</option>
        {listaGeneros.map((gen) => (
          <option key={gen._id} value={gen._id}>{gen.nombre}</option>
        ))}
      </select>

      <input name="fechaLanzamiento" type="date" onChange={handleChange} required style={estilos.input} />
      <input name="coverImageUrl" placeholder="URL de la imagen de portada" onChange={handleChange} required style={estilos.input} />
      
      <label style={{ display: 'block', margin: '10px 0' }}>Archivo de audio (MP3):</label>
      <input type="file" accept="audio/*" onChange={handleFileChange} required />
      <br></br>
      <br></br>

      <button type="submit" disabled={subiendo} style={estilos.boton}>
        {subiendo ? 'Subiendo...' : 'Guardar Canción'}
      </button>
    </form>
  );
}

const estilos = {
  form: { background: '#282828', padding: '20px', borderRadius: '10px', marginBottom: '20px' },
  input: { display: 'block', width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#3e3e3e', color: 'white' },
  boton: { background: '#1DB954', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }
};

export default SubirCanciones;