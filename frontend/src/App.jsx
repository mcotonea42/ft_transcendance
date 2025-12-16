import { useState, useEffect } from 'react';
// Importez la nouvelle fonction de service
import { getTestData, getDbStatus } from './services/apiService'; 
import './App.css'; 

function App() {
  const [data, setData] = useState(null);
  const [dbStatus, setDbStatus] = useState(null); // <-- Nouveau état

  useEffect(() => {
    // Test Front/Back initial
    getTestData().then(setData);

    // Test DB
    getDbStatus().then(setDbStatus); // <-- Appel de la nouvelle fonction
  }, []);

  return (
    <div className="App">
      <h1>🚀 Connexion Front-End React / Back-End Node.js </h1>
      
      <h2>1. Communication Front ↔ Back</h2>
      {data ? (
        <pre>{data.message}</pre>
      ) : (<p>Connexion en cours...</p>)}

      <h2>2. Statut de la Base de Données (Backend ↔ DB)</h2>
      {dbStatus && (
        <pre style={{ backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '5px' }}>
          {dbStatus.error ? ( // Afficher l'erreur si elle existe
            <span style={{color: 'red'}}>Erreur: {dbStatus.error}</span>
          ) : (
            <>
              {dbStatus.message}
              <br />
              Version MySQL: {dbStatus.mysqlVersion}
            </>
          )}
        </pre>
      )}

      <p>N'oubliez pas de **reconstruire le Front** après cette modification de code (Étape 4).</p>
    </div>
  );
}

export default App;