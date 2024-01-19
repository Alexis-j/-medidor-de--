const express = require('express');
const path = require('path');
const fs = require('fs');  // Agrega esta línea para importar el módulo fs
const { calculateScores } = require('../scoring/scoring.js');

const app = express();
const PORT = 3001;

// Configuración para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get('/', (req, res) => {
  const htmlContent = fs.readFileSync(path.join(__dirname, '../..', 'public', 'index.html'), 'utf-8');
  res.send(htmlContent);
});

// Ruta para /scores
app.get('/scores', (req, res) => {
  const scores = calculateScores();
  res.json(scores);
});

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
