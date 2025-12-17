import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/usuarios/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (response.ok) {
      alert("Usuario registrado correctamente");
      navigate("/login"); 
    } else {
      alert(data.error);
    }
  };

  return (
    <div style={estilos.container}>
      <h1 style={estilos.tituloPrincipal}>Bienvenido a FideMusic!</h1>
      <h2 style={estilos.subtitulo}>¿Es tu primera vez por aqui? Crea tu cuenta!</h2>

      <div style={estilos.card}>
        <h2 style={estilos.subtitulo}>Crear Cuenta</h2>
        <form onSubmit={handleSubmit} style={estilos.formulario}>
          <input
            style={estilos.input}
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            onChange={handleChange}
            required
          />
          <input
            style={estilos.input}
            type="email"
            name="email"
            placeholder="Correo"
            onChange={handleChange}
            required
          />
          <input
            style={estilos.input}
            type="password"
            name="password"
            placeholder="Contraseña"
            onChange={handleChange}
            required
          />
          <button type="submit" style={estilos.botonPrimario}>Registrarse</button>
        </form>
        <p style={estilos.textoFooter}>
          ¿Ya tienes cuenta? <Link to="/login" style={estilos.link}>Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

const estilos = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '95vh',
    textAlign: 'center'
  },
  tituloPrincipal: { fontSize: '2.5rem', marginBottom: '30px', color: 'white' },
  card: {
    backgroundColor: '#181818',
    padding: '40px',
    borderRadius: '15px',
    border: '1px solid #333',
    width: '100%',
    maxWidth: '400px',
  },
  subtitulo: { fontSize: '1.5rem', marginBottom: '20px', color: '#b3b3b3' },
  formulario: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #333',
    backgroundColor: '#282828',
    color: 'white',
    fontSize: '1rem'
  },
  botonPrimario: {
    padding: '12px',
    borderRadius: '25px',
    border: 'none',
    backgroundColor: '#1DB954',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px'
  },
  textoFooter: { marginTop: '20px', color: '#b3b3b3', fontSize: '0.9rem' },
  link: { color: '#1DB954', textDecoration: 'none', fontWeight: 'bold' }
};

export default Register;