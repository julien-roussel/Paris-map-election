import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  SubTitle,
} from 'chart.js';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  SubTitle
);

let chartInstance;

// ----------------------------------------------------------------------------------------------
// Fonction pour générer le graphique BAR des résultats de la Gauche, centre, DROITE et EXD
function generateGraphBarBlocCenter(results, allNameElections, nuancePolitique, widthPage) {
    const containerGraph = document.getElementById('graphBarBlocCenter');
    if (!containerGraph || !results || !nuancePolitique) return;
    const ctx = containerGraph.getContext('2d');

    if (window.graphBarBlocCenter instanceof Chart) {
        window.graphBarBlocCenter.destroy();
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
    const partiMap = {};
    Object.entries(nuancePolitique).forEach(([acronyme, nuance]) => {
        if (nuance.tendance === "Centriste" || 
            nuance.tendance === "Droite" ||
            nuance.tendance === "Divers droite" ||
            nuance.tendance === "Régionaliste"
            ) {
            partiMap[acronyme] = {
                label: acronyme,
                color: nuance.color || '#000000',
                data: Array(electionsName.length).fill(0) // une valeur par élection
            };
        }
    });

    // 2. Remplir les données par tendance pour chaque élection
    electionsName.forEach((electionKey, electionIndex) => {
        const candidats = results[electionKey]?.candidats;
        
        candidats.forEach(candidate => {
            const { parti_code, voix } = candidate;
            
            if (partiMap[parti_code]) {
                partiMap[parti_code].data[electionIndex] += voix;
            }
        });
    });

    // 3. Ajouter la série "Abstention"
    const abstentionData = electionsName.map(electionKey => {
        const abst = results[electionKey]?.meta.Abstentions;
        return abst ?? 0;
    });


     // 4. Transformer en datasets Chart.js
    Object.entries(partiMap).forEach(([key, parti]) => {
        const visible = parti.data.some((voix, index) => {
            const inscrits = InscritsData[index];
            return inscrits > 0 && (voix / inscrits) >= 0.02;
        });

        if (visible || key === "Abstention") {
            data.datasets.push({
                label: parti.label,
                data: parti.data,
                backgroundColor: parti.color || '#000000',
                fill: false
            });
        }
    });

    // 5. Récupérer le max voix
    const allVoix = Object.values(partiMap)
                          .flatMap(parti => parti.data);
    const maxVoix = Math.max(...allVoix);
    const yMax = allVoix.concat();  

    // 6. Créer le graphique Bloc
    window.graphBarBlocCenter = new Chart(ctx, {
        type: 'bar',
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
                    text: 'Résultats des élections à droite',
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
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    max: yMax
                }               
            }
        }
    });
}

export default { generateGraphBarBlocCenter }