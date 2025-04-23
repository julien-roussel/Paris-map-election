import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = 3001;

app.use(cors());

let resultatsPresi2017 = {};
let resultatsPresi2022 = {};
let resultatsEuro2024 = {};
let nuancePolitique = {};

// Route pour charger les nuances politiques des candidats
app.get('/api/elections/candidats', (req, res) => {
  const filepath = `./json/nuance_politique.json`;
  
  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ error: `Fichier nuance_politique.json introuvable.` });
  }

  try {
    const raw = fs.readFileSync(filepath, 'utf-8');
    let data = Object.entries(JSON.parse(raw));
    res.json(Object.fromEntries(data));

  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Erreur lecture JSON.' });
  }
});

// Route pour charger les résultats pour un bureau de vote 
app.get('/api/elections/:slug/:bureauId', (req, res) => {
  const { slug, bureauId } = req.params;
  const { circo, departement } = req.query;

  if (!departement) {
    return res.status(400).json({ error: 'Département requis' });
  }

  const filepath = `./parse/json/${slug}/resultats_${departement}.json`;

  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ error: `Fichier ${slug} ${departement} introuvable.` });
  }

  try {
    const raw = fs.readFileSync(filepath, 'utf-8');
    const data = JSON.parse(raw);

    // ✅ Vérifie si le bureauId est bien présent
    const bureau = data[bureauId];

    if (!bureau) {
      const allKeys = Object.keys(data);
      const close = allKeys.find(k => k.includes(bureauId));
      console.warn(`❌ Bureau ${bureauId} introuvable. Clé proche trouvée : ${close}`);
      return res.status(404).json({ error: `Bureau ${bureauId} introuvable.` });
    }

    return res.json(bureau);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erreur lecture JSON.' });
  }
});

// Route pour charger les résultats d'une élection
app.get('/api/elections/:slug', (req, res) => {
    const { slug } = req.params;
    const { circo, departement } = req.query;
    console.log('api : ' + slug + ' ' + departement);
    
    if (!departement) {
      return res.status(400).json({ error: 'Département requis' });
    }

    const filepath = `./parse/json/${slug}/resultats_${departement}.json`;
  
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: `Fichier ${slug} ${departement} introuvable.` });
    }
    
    try {
      const raw = fs.readFileSync(filepath, 'utf-8');
      let data = Object.entries(JSON.parse(raw));
  
      if (departement) {
        data = data.filter(([_, val]) => val.meta["Code du département"] === departement);
      }
  
      if (circo) {
        data = data.filter(([_, val]) => val.meta["Code de la circonscription"] === circo);
      }
  
      res.json(Object.fromEntries(data));
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Erreur lecture JSON.' });
    }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur prêt sur http://localhost:${PORT}/api/elections/`);
});
