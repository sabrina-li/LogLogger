var ctx = document.getElementById('poopChart').getContext('2d');

const lightBlue = 'rgba(54, 162, 235, 0.2)',
    blue = 'rgba(54, 162, 235, 1)',
    lightOrange = 'rgba(255, 159, 64, 0.2)',
    orange = 'rgba(255, 159, 64, 1)';
const dates=[1,2,3,4];
const bristolScores=[5,4,6,7]


var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: dates,
        datasets: [{
            label: '# of Votes',
            data: [120, 190, 30, 50],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1,
            yAxisID:"y-water"
        },{
            label: 'bristol score',
            data: bristolScores,
            type: 'line',
            yAxisID:"y-bristol"
        }]
    },
    options:{
        responsive: true,
        stacked: false,
        hoverMode: 'index',
        title:{
            display: true,
            text:'Chart.js Line Chart - Multi Axis'
        },
        scales: {
            yAxes: [{
                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: "left",
                id: "y-water",
            }, {
                min:0,
                max:8,
                type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: "right",
                id: "y-bristol",
                

                // grid line settings
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            }],
        }

    }
});


// var mixedChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         datasets: [{
//             label: 'Bar Dataset',
//             data: [10, 20, 30, 40]
//         }, {
//             label: 'Line Dataset',
//             data: [50, 50, 50, 50],

//             // Changes this dataset to become a line
//             type: 'line'
//         }],
//         labels: ['January', 'February', 'March', 'April']
//     },
//     options: options
// });