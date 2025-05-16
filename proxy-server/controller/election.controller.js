const createError = require('../middleware/error')
const fs = require('fs')
const path = require('path');
const dirname = path.dirname(__filename);

// Route pour charger les nuances politiques des candidats
const getAllCandidats = async (req, res, next) => {
    const filepath = path.resolve(dirname, '../parse/json/nuance_politique.json');
      
    if (!fs.existsSync(filepath)) {
    return res.status(404).json({ 
            error: `Fichier nuance_politique.json introuvable.` 
        });
    }

    try {
        const raw = fs.readFileSync(filepath, 'utf-8');
        let data = Object.entries(JSON.parse(raw));
        res.json(Object.fromEntries(data));
    } catch (error) {
        next(createError(500, error.message))
    }
}

// Route pour charger les résultats pour un bureau de vote 
const getElectionByBv = async (req, res, next) => {
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
        //console.warn(`❌ Bureau ${bureauId} introuvable. Clé proche trouvée : ${close}`);
        return res.status(404).json({ error: `Bureau ${bureauId} introuvable.` });
    }

        return res.json(bureau);
    } catch (err) {
        next(createError(500, error.message))
    }
}

// Route pour charger les résultats d'une élection
const getResultElection = async (req, res, next) => {
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
    } catch (error) {
        next(createError(500, error.message))
    }
}

module.exports = {
    getAllCandidats,
    getElectionByBv,
    getResultElection,
}

