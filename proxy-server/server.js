const app = require('./app');
const ENV = require('./config/env')

// PORT
const PORT = ENV.PORT || 3001;

// LISTEN
app.listen(PORT, () => {
  console.log(`🚀 Serveur prêt sur http://localhost:${PORT}`);
});
