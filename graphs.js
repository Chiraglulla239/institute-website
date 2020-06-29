document.addEventListener("DOMContentLoaded",function(event){
    let element = document.getElementById('mkChart').getContext('2d');

    let barChart = new Chart(element, {
        type: 'bar',
        data: {
            labels: ["90+", "80+", "70+", "60+", "50+"],
            datasets: [{
                label: "Percentage of Students",
                data: [
                    50,
                    40,
                    30,
                    20,
                    10
                ],
                backgroundColor: 'rgba(153, 102, 255, 0.8)', 
                borderWidth: 1,
                borderColor: 'black',
                hoverBorderWidth: 2,
            }],
        },
        options: {
            title: {
                display: true,
                text: 'M. K. Tutorials Result Analysis',
                fontSize: 14
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Percentage of Students',
                    fontSize: 12,
                  }
                }],
                xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Marks',
                      fontSize: 12,
                    }
                  }]
            }  
        }
    });
})
document.addEventListener("DOMContentLoaded",function(event){
    let element = document.getElementById('muChart').getContext('2d');

    let barChart = new Chart(element, {
        type: 'bar',
        data: {
            labels: ["90+", "80+", "70+", "60+", "50+"],
            datasets: [{
                label: "Percentage of Students",
                data: [
                    10,
                    20,
                    30,
                    40,
                    50
                ],
                backgroundColor: 'rgba(153, 102, 255, 0.8)', 
                borderWidth: 1,
                borderColor: 'black',
                hoverBorderWidth: 2,
            }],
        },
        options: {
            title: {
                display: true,
                text: 'Mumbai University Result Analysis',
                fontSize: 14
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Percentage of Students',
                    fontSize: 12,
                  }
                }],
                xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Marks',
                      fontSize: 12,
                    }
                  }]
            }  
        },
    });
})