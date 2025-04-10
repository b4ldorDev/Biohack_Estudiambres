function openTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });
    
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    document.getElementById(tabName).classList.add('active');
    
    event.currentTarget.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    const ctx = document.getElementById('emgChart').getContext('2d');
    
    const rawData = generateSampleEMGData(100);
    const filteredData = applyFilter(rawData);
    
    const emgChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 100}, (_, i) => i),
            datasets: [
                {
                    label: 'Señal EMG Cruda',
                    data: rawData,
                    borderColor: '#FF5757',
                    backgroundColor: 'rgba(255, 87, 87, 0.1)',
                    borderWidth: 2,
                    tension: 0.1
                },
                {
                    label: 'Señal EMG Filtrada',
                    data: filteredData,
                    borderColor: '#2D74FF',
                    backgroundColor: 'rgba(45, 116, 255, 0.1)',
                    borderWidth: 2,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Procesamiento de Señal EMG'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    position: 'top'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tiempo (ms)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Amplitud (mV)'
                    },
                    min: -1.5,
                    max: 1.5
                }
            }
        }
    });
    
    const nav = document.getElementById('main-nav');
    const navOffset = nav.offsetTop;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY >= navOffset) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    });
});

function generateSampleEMGData(length) {
    const data = [];
    for (let i = 0; i < length; i++) {
        let value = (Math.random() - 0.5) * 0.3;
        
        if (i > 20 && i < 30 || i > 60 && i < 80) {
            value += Math.sin(i * 0.8) * 0.8 + (Math.random() - 0.5) * 0.5;
        }
        
        data.push(value);
    }
    return data;
}

function applyFilter(data) {
    const filtered = [];
    const windowSize = 5;
    
    for (let i = 0; i < data.length; i++) {
        if (i < windowSize - 1) {
            filtered.push(data[i]);
        } else {
            let sum = 0;
            for (let j = 0; j < windowSize; j++) {
                sum += data[i - j];
            }
            filtered.push(sum / windowSize);
        }
    }
    
    return filtered;
}
