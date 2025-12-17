import SubirCanciones from '../../components/subirCanciones';
import { useNavigate } from 'react-router-dom'

export default function Subir() {
    const navigate = useNavigate();
  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#121212', color: 'white', minHeight: '100vh' }}>
    

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}></div>
    <div>
        <button 
        onClick={() => navigate('/buscar')} 
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
      </div>
      <h2> Subir nueva cancion</h2>
      
      <SubirCanciones alFinalizar={() => alert("¡Canción lista!")} />
    </div>
  )
}