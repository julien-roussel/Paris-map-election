const createError = require('../middleware/error')
const fs = require('fs')
const path = require('path');
const dirname = path.dirname(__filename);

// Model
const Users     = require('../models/user.model');

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

// Route pour charger les nuances politiques des candidats
// Si l'utilisateur n'est pas connecté
const getAllNameElectionsNoConnected = async (req, res, next) => {
    try {
        const filepath = path.resolve(dirname, '../parse/json/all_elections.json');

        if (!fs.existsSync(filepath)) {
            return res.status(404).json({ 
                    error: `Fichier all_elections.json est introuvable.` 
                });
        }

        const raw = fs.readFileSync(filepath, 'utf-8');
        const data = JSON.parse(raw);
        const filtered = data.filter(election => election.idName === 'presi2022')
        res.json(filtered);
    } catch (error) {
        next(createError(500, error.message))
    }
}

// Route pour charger les nuances politiques des candidats
// Si l'utilisateur est connecté
const getAllNameElectionsConnected = async (req, res, next) => {
    try {
        // Vérifier si l'utilisateur est connecté 
        if(!req.user || !req.user.id) return next(createError(401, 'Authentification requise'))
        
        // Vérifier si l'utilisateur existe
        const user = await Users.findById(req.params.id);
        if(!user) return next(createError(404, 'User not found'))
            
        // Vérifier si l'utilisateur est authentifié
        if( user._id.toString() !== req.user.id.toString()) return next(createError(403, 'Accès refusé'))
        
        const filepath = path.resolve(dirname, '../parse/json/all_elections.json');
        if (!fs.existsSync(filepath)) {
        return res.status(404).json({ 
                error: `Fichier all_elections.json est introuvable.` 
            });
        }

        const raw = fs.readFileSync(filepath, 'utf-8');
        const data = JSON.parse(raw);
        const filtered = data.filter(election => election.type == 'presi')
        res.json(filtered);
        
    } catch (error) {
        next(createError(500, error.message))
    }
}

// Route pour charger les nuances politiques des candidats
// Si l'utilisateur est connecté
const getAllNameElectionsMember = async (req, res, next) => {
    try {
        // Vérifier si l'utilisateur est connecté 
        if(!req.user || !req.user.id) return next(createError(401, 'Authentification requise'))
        
        // Vérifier si l'utilisateur existe
        const user = await Users.findById(req.params.id);
        if(!user) return next(createError(404, 'User not found'))
            
        // Vérifier si l'utilisateur est authentifié
        if( user._id.toString() !== req.user.id.toString()) return next(createError(403, 'Accès refusé'))
        
        const filepath = path.resolve(dirname, '../parse/json/all_elections.json');
        if (!fs.existsSync(filepath)) {
        return res.status(404).json({ 
                error: `Fichier all_elections.json est introuvable.` 
            });
        }

        const raw = fs.readFileSync(filepath, 'utf-8');
        const data = JSON.parse(raw);
        res.json(data);
        
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

// Route non connecté pour charger les résultats d'une élection 
const getResultElectionNoConnected = async (req, res, next) => {
    const { departement } = req.query;
    console.log('api : ' + departement);
    if (!departement)  return res.status(400).json({ error: 'Département requis' })

    const filepath = `./parse/json/presi2022/resultats_${departement}.json`;

    if (!fs.existsSync(filepath)) {
        return res.status(404).json({ error: `Fichier ${slug} ${departement} introuvable.` });
    }
    
    try {
        const raw = fs.readFileSync(filepath, 'utf-8');
        let data = Object.entries(JSON.parse(raw));
        data = data.filter(([_, val]) => val.meta["Code du département"] === departement);
        res.json(Object.fromEntries(data));
    } catch (error) {
        next(createError(500, error.message))
    }
}

const getResultElectionConnected = async (req, res, next) => {
    try {
        const { departement } = req.query;

        // Vérifier si l'utilisateur est connecté 
        if(!req.user || !req.user.id) return next(createError(401, 'Authentification requise'))
        
        // Vérifier si l'utilisateur existe
        const user = await Users.findById(req.params.id);
        if(!user) return next(createError(404, 'User not found'))
            
        // Vérifier si l'utilisateur est authentifié
        if( user._id.toString() !== req.user.id.toString()) return next(createError(403, 'Accès refusé'))
        
        // Vérifier si le département existe
        if (!departement) return res.status(400).json({ error: 'Département requis' });

        const filepath2012 = `./parse/json/presi2012/resultats_${departement}.json`;
        const filepath2017 = `./parse/json/presi2017/resultats_${departement}.json`;
        const filepath2022 = `./parse/json/presi2022/resultats_${departement}.json`;

        if (!fs.existsSync(filepath2012) || 
            !fs.existsSync(filepath2017) || 
            !fs.existsSync(filepath2022) ) {
            return res.status(404).json({ error: `Fichier élections presi départements ${departement} introuvables.` });
        }
    
        const raw2012 = fs.readFileSync(filepath2012, 'utf-8');
        const raw2017 = fs.readFileSync(filepath2017, 'utf-8');
        const raw2022 = fs.readFileSync(filepath2022, 'utf-8');

        // Convertir chaque fichier JSON en objets
        const data2012 = JSON.parse(raw2012);
        const data2017 = JSON.parse(raw2017);
        const data2022 = JSON.parse(raw2022);

        // Fusionner les objets
        const combinedData = {
            ...data2012,
            ...data2017,
            ...data2022,
        };

        // Appliquer le filtre
        const filtered = Object.entries(combinedData).filter(
            ([_, val]) => val.meta["Code du département"] === departement
        );

        res.json(Object.fromEntries(filtered));
    } catch (error) {
        next(createError(500, error.message))
    }
}

// Route pour charger les résultats d'une élection
// Si l'utilisateur est membre
const getResultElectionMember = async (req, res, next) => {
    const { slug, id } = req.params;
    const { circo, departement } = req.query;
    
    // Vérifier si l'utilisateur est connecté 
    if(!req.user || !req.user.id) return next(createError(401, 'Authentification requise'))
        
    // Vérifier si l'utilisateur existe
    const user = await Users.findById(req.params.id);
    if(!user) return next(createError(404, 'User not found'))
        
    // Vérifier si l'utilisateur est authentifié
    if( user._id.toString() !== req.user.id.toString()) return next(createError(403, 'Accès refusé'))

    // Vérifier si l'utilisateur est membre
    if(!user.isSuscriber) return next(createError(403, "Accès refusé - l'utilisateur n'est pas membre"))

    if (!departement) return res.status(400).json({ error: 'Département requis' });

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
    getAllNameElectionsNoConnected,
    getAllNameElectionsConnected,
    getAllNameElectionsMember,
    getAllCandidats,
    getElectionByBv,
    getResultElectionNoConnected,
    getResultElectionConnected,
    getResultElectionMember,
}

