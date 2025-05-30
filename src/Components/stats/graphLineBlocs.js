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
function generateLineGraph(results, nuancePolitique) {
    const containerGraph = document.getElementById('graphLineBlocs');
    if (!containerGraph || !results || !nuancePolitique) return;
    const ctx = containerGraph.getContext('2d');

    if (window.graphLineBlocs instanceof Chart) {
        window.graphLineBlocs.destroy();
    }
    const electionsName = Object.keys(results).filter(
        key =>
            key !== 'meta' &&
            results[key] &&
            Array.isArray(results[key].candidats)
    );
    
    const data = {
        labels: electionsName,
        datasets: []
    };

    // 1. Extraire toutes les tendances uniques à partir de nuancePolitiqu"
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

    // 3. Transformer en datasets Chart.js
    Object.values(tendancesMap).forEach(tendance => {
        data.datasets.push({
            label: tendance.label,
            data: tendance.data,
            borderColor: tendance.color || '#000000',
            fill: false
        });
    });

    // 4. Récupérer le max voix
    const allVoix = Object.values(tendancesMap)
                          .flatMap(tendance => tendance.data);
    const maxVoix = Math.max(...allVoix);
    const yMax = Math.ceil(maxVoix * 1.2);  

    // 5. Créer le graphique LINE
    window.graphLineBlocs = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'left',
                    labels: {
                        boxWidth: 40, 
                        boxHeight: 40, 
                        padding: 10,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Résultats des élections par tendance',
                    font: {
                        size: 26,
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