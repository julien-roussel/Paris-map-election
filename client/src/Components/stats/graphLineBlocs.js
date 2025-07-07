import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  SubTitle,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  SubTitle
);

let chartInstance;

// ----------------------------------------------------------------------------------------------
// Fonction pour générer le graphique LINE des résultats de la Gauche, centre, DROITE et EXD
function generateLineGraph(results, allNameElections, nuancePolitique, widthPage) {
    const containerGraph = document.getElementById('graphLineBlocs');
    if (!containerGraph || !results || !nuancePolitique) return;
    const ctx = containerGraph.getContext('2d');

    if (window.graphLineBlocs instanceof Chart) {
        window.graphLineBlocs.destroy();
    }
    
    const electionsName = allNameElections
        .map(e => e.idName)
        .filter(id => results[id]);

    const labels = electionsName.map(id => {
        const match = allNameElections.find(e => e.idName === id);
        if(widthPage < 860) return match ? match.idName : id;
        return match ? match.name : id;
    });


    const data = {
        labels: labels,
        datasets: []
    };

    // 0. Récupérer la série "Inscrits"
    const InscritsData = electionsName.map(electionKey => {
        const abst = results[electionKey]?.meta.Inscrits;
        return abst ?? 0;
    });

    // 1. Extraire toutes les tendances uniques à partir de nuancePolitique
    const tendancesMap = {};
    Object.values(nuancePolitique).forEach(nuance => {
        const tendance = nuance.tendance;
        if (!tendancesMap[tendance]) {
            tendancesMap[tendance] = {
                label: tendance,
                color: nuance.color || '#000000',
                data: Array(electionsName.length).fill(0) // une valeur par élection
            };
        }
    });

    // 2. Remplir les données par tendance pour chaque élection
    electionsName.forEach((electionKey, electionIndex) => {
        const candidats = results[electionKey]?.candidats;
        
        candidats.forEach(candidate => {
            const { tendance, voix } = candidate;
            
            if (tendancesMap[tendance]) {
                tendancesMap[tendance].data[electionIndex] += voix;
            }
        });
    });

    // 3. Ajouter la série "Abstention"
    const abstentionData = electionsName.map(electionKey => {
        const abst = results[electionKey]?.meta.Abstentions;
        return abst ?? 0;
    });

    tendancesMap["Abstention"] = {
        label: "Abstention",
        color: "#cccccc",
        data: abstentionData
    };


    // 4. Transformer en datasets Chart.js
    Object.entries(tendancesMap).forEach(([key, parti]) => {
        const visible = parti.data.some((voix, index) => {
            const inscrits = InscritsData[index];
            return inscrits > 0 && (voix / inscrits) >= 0.015;
        });

        if (visible || key === "Abstention") {
            data.datasets.push({
                label: parti.label,
                data: parti.data,
                borderColor: parti.color || '#000000',
                fill: false
            });
        }
    });

    // 5. Récupérer le max voix
    const allVoix = Object.values(tendancesMap)
                          .flatMap(tendance => tendance.data);
    const maxVoix = Math.max(...allVoix);
    const yMax = Math.ceil(maxVoix * 1.2);  

    // 6. Créer le graphique LINE
    window.graphLineBlocs = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: widthPage > 860 ? 1.25 : 1,
            plugins: {
                legend: {
                    position: widthPage > 860 ? 'left' : 'bottom',
                    labels: {
                        boxWidth:  widthPage > 860 ? 40 : 10, 
                        boxHeight:  widthPage > 860 ? 20 : 3, 
                        padding: 10,
                        font: {
                            size:  widthPage > 860 ? 12 : 8
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Résultats des élections par tendance',
                    font: {
                        size:  widthPage > 860 ? 26 : 18,
                    },
                },
                subtitle: {
                    display: true,
                    text: 'Par bureau de vote & en nombre de vote',
                    font: {
                      size: 12,
                      weight: 'normal',
                      style: 'italic'
                    },
                    padding: {
                      bottom: 10
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: yMax
                }
            }
        }
    });
}

export default { generateLineGraph }