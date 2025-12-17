import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CrearGenero() {
  const [datos, setDatos] = useState({ nombre: '', descripcion: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setDatos({ ...datos, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/api/generos', datos, {
        headers: { 'Authorization': token }
      });
      alert("¡Género creado con éxito!");
      navigate('/listarGenero');
    } catch (error) {
      alert("Error: " + (error.response?.data?.mensaje || "No autorizado"));
    }
  };

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <button onClick={() => navigate('/listarGenero')} style={estilos.botonVolver}>← Volver</button>
      <h2>Añadir Nuevo Género</h2>
      
      <form onSubmit={handleSubmit} style={estilos.form}>
        <input 
            name="nombre" 
            placeholder="Nombre del Género (ej: Rock, Pop)" 
            onChange={handleChange} 
            style={estilos.input} 
            required 
        />
        <textarea 
            name="descripcion" 
            placeholder="Breve descripción" 
            onChange={handleChange} 
            style={{ ...estilos.input, minHeight: '100px' }} 
        />
        <button type="submit" style={estilos.boton}>Guardar Género</button>
      </form>
    </div>
  );
}

const estilos = {
  form: { background: '#282828', padding: '20px', borderRadius: '10px' },
  input: { display: 'block', width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#3e3e3e', color: 'white' },
  boton: { background: '#1DB954', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', width: '100%' },
  botonVolver: { marginBottom: '10px', cursor: 'pointer', background: '#333', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }
};