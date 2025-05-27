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
function generateLineGraph(results, electionsName) {
    var containerGraph = document.getElementById('graphLineBlocs')
    if (!containerGraph) return;
    const ctx = containerGraph.getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }

    var labels = electionsName
    const colors = {    gauche: '#ff5d5d',    macron: '#ffb847',    droite: '#005dc7',    exd: '#ab785f'    };
    var data = {
        labels: labels,
        datasets: [
            {
                label: 'Gauche',
                data: results.gauche,  // Résultats pour "Gauche"
                borderColor: colors.gauche,
                fill: false
            },
            {
                label: 'Centre (Macron)',
                data: results.macron,  // Résultats pour "Macron"
                borderColor: colors.macron,
                fill: false
            },
            {
                label: 'Divers Droite',
                data: results.droite,  // Résultats pour "DROITE"
                borderColor: colors.droite,
                fill: false
            },
            {
                label: 'Extrême Droite',
                data: results.exd,  // Résultats pour "ExD"
                borderColor: colors.exd,
                fill: false
            },
            {
                label: 'Abstention',
                data: results.abstentions,  // Résultats pour l'abstention
                borderColor: '#ebebeb',
                fill: false
            }
        ]
    };

    // Créer le graphique LINE
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
                    text: 'Résultats des 4 blocs',
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
                    max: 400
                }
            }
        }
    });
}

export default { generateLineGraph }