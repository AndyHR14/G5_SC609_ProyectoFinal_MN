import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Home from './views/Home';
import Subir from './views/canciones/subir'; 
import Buscar from './views/canciones/buscar'; 
import Eliminar from './views/canciones/eliminar';
import Login from './views/usuarios/login';
import Register from './views/usuarios/register';
import Crear from './views/albumes/crear';
import Listar from './views/albumes/listar';
import Borrar from './views/albumes/borrar';
import CrearArtista from './views/Artistas/crearArtista';
import ListarArtistas from './views/Artistas/listarArtista';
import EliminarArtista from './views/artistas/eliminarArtista';
import CrearGenero from './views/generos/crearGenero';
import ListarGeneros from './views/generos/listarGenero';
import EliminarGenero from './views/generos/eliminarGenero';


function App() {
const isAuth = !!localStorage.getItem('token');
  return (
   <Router>
      <div style={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
        <Routes>
          <Route 
            path="/login" 
            element={!isAuth ? <Login /> : <Navigate to="/home" replace />} 
          />
          <Route 
            path="/register" 
            element={!isAuth ? <Register /> : <Navigate to="/home" replace />} 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route 
            path="/home" 
            element={isAuth ? <Home /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/buscar" 
            element={isAuth ? <Buscar /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/subir" 
            element={isAuth ? <Subir /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/eliminar" 
            element={isAuth ? <Eliminar /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/crear" 
            element={isAuth ? <Crear /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/listar" 
            element={isAuth ? <Listar /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/borrar" 
            element={isAuth ? <Borrar /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/crearArtista" 
            element={isAuth ? <CrearArtista /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/listarArtista" 
            element={isAuth ? <ListarArtistas /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/eliminarArtista" 
            element={isAuth ? <EliminarArtista /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/crearGenero" 
            element={isAuth ? <CrearGenero/> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/listarGenero" 
            element={isAuth ? <ListarGeneros /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/eliminarGenero" 
            element={isAuth ? <EliminarGenero /> : <Navigate to="/login" replace />} 
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;