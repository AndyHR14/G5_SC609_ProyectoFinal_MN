import { Link } from 'react-router-dom';

function Home() {
    const cerrarSesion = () => {

    localStorage.removeItem('token'); 
    
    window.location.href = '/login'
    };
  return (
    <div style={estilos.container}>

      <button onClick={cerrarSesion} style={estilos.botonLogout}>
        Cerrar Sesión
      </button>

      <h1 style={estilos.titulo}>Bienvenido a FideMusic</h1>
      <p style={estilos.subtitulo}>Tu reproductor de música de confianza!</p>
      
      <div style={estilos.gridBotones}>
        <Link to="/buscar" style={estilos.boton}>
          <span style={estilos.icono}></span>
          <span style={estilos.textoBoton}>Administrar Canciones</span>
        </Link>
        
        <Link to="/listar" style={estilos.boton}>
          <span style={estilos.icono}></span>
          <span style={estilos.textoBoton}>Administrar Albumes</span>
        </Link>
        <Link to="/listarArtista" style={estilos.boton}>
        <span style={estilos.icono}></span>
        <span style={estilos.textoBoton}>Administrar Artistas</span>
        </Link>
        <Link to="/listarGenero" style={estilos.boton}>
          <span style={estilos.icono}></span>
          <span style={estilos.textoBoton}>Administrar Generos</span>
        </Link>
        <Link to="/Home" style={estilos.boton}>
          <span style={estilos.icono}></span>
          <span style={estilos.textoBoton}>Administrar Playlist</span>
        </Link>
        <Link to="/Home" style={estilos.boton}>
          <span style={estilos.icono}></span>
          <span style={estilos.textoBoton}>Administrar Suscripciones</span>
        </Link>
        <Link to="/Home" style={estilos.boton}>
          <span style={estilos.icono}></span>
          <span style={estilos.textoBoton}>Administrar Recomendaciones</span>
        </Link>
        <Link to="/Home" style={estilos.boton}>
          <span style={estilos.icono}></span>
          <span style={estilos.textoBoton}>Administrar Favoritos</span>
        </Link>
        <Link to="/Home" style={estilos.boton}>
          <span style={estilos.icono}></span>
          <span style={estilos.textoBoton}>Administrar Historial</span>
        </Link>
      </div>
    </div>
  );
}

const estilos = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh', 
    textAlign: 'center',
    position: 'relative' 
  },
  botonLogout: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  titulo: { fontSize: '2.5rem', marginBottom: '10px' },
  subtitulo: { fontSize: '1.2rem', color: '#b3b3b3', marginBottom: '40px' },
  gridBotones: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  boton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '200px',
    height: '150px',
    backgroundColor: '#181818',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '15px',
    transition: 'transform 0.2s, background-color 0.2s',
    border: '1px solid #333',
    cursor: 'pointer'
  },
  icono: { fontSize: '3rem', marginBottom: '10px' },
  textoBoton: { fontWeight: 'bold', fontSize: '1.1rem' }
};

export default Home;