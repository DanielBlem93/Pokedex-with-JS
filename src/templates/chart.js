new Chart(ctx, {
    type: 'radar',
    data: {
      
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Basiswert',
            data: [1, 2, 3, 4, 5, 6],
            borderWidth: 1,
            backgroundColor: [
                'rgba(255, 0, 0, 0.3)',
                'rgba(17, 0, 255, 0.3)',
                'rgba(0, 238, 255, 0.3)',
                'rgba(0, 255, 13, 0.25)',
                'rgba(212, 0, 255, 0.3)',
                'rgba(255, 174, 0, 0.3)',
            ],
            borderColor: [
                'rgba(255, 0, 0, 0.8)',
                'rgba(17, 0, 255, 0.8)',
                'rgba(0, 238, 255, 0.8)',
                'rgba(0, 255, 13, 1)',
                'rgba(212, 0, 255, 0.8)',
                'rgba(255, 174, 0, 0.8)',
            ]
        }]
    },
    options: {
        indexAxis: 'y',
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});
