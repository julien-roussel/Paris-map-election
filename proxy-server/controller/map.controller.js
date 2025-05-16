const createError = require('../middleware/error')
const fs = require('fs')

const getMapByDepartement = async (req, res, next) => {
    const { departement } = req.query;
      if (!departement)  return res.status(400).json({ error: 'Département requis' });
      
      const filepath = `./parse/geojson/departement_${departement}.geojson`;
      if (!fs.existsSync(filepath))  return res.status(404).json({ error: `Fichier ${departement} introuvable.` });
    
      try {
        const raw = fs.readFileSync(filepath, 'utf-8');
        const geojson = JSON.parse(raw);
        res.json(geojson);
    
      } catch (error) {
        next(createError(500, error.message))
      }
}

const getAllDepartement = async (req, res, next) => {
    const filepath = `./parse/json/all_departement.json`;
    if (!fs.existsSync(filepath))  return res.status(404).json({ error: `Fichier de tous les départements introuvable.` });
    
    try {
        const raw = fs.readFileSync(filepath, 'utf-8');
        let data = Object.entries(JSON.parse(raw));
        res.json(Object.fromEntries(data));
    } catch (error) {
        next(createError(500, error.message))
    }
}


module.exports = {
    getMapByDepartement,
    getAllDepartement,
}

