const displayChart = _ => {

    const ctx = document.getElementById('poopChart').getContext('2d');

    const lightBlue = 'rgba(54, 162, 235, 0.2)',
        blue = 'rgba(54, 162, 235, 1)',
        lightOrange = 'rgba(255, 159, 64, 0.2)',
        orange = 'rgba(255, 159, 64, 1)';

    const timeFormat = 'MM/DD/YYYY HH:mm';
    moment.defaultFormat = timeFormat;

    const waterData = dummy_data.water;//from dummy_Data
    const waterIntake = waterData.map(x => x.intake);
    const waterTimes = waterData.map(x => x.time);
    const stoolData = dummy_data.stool;//from dummy_Data
    const bristolScores = stoolData.map(x => {
        let result = {};
        result.y = x.bristolScore;
        result.x = x.time;
        
        return result;
    });
    console.log(waterTimes);
    console.log(bristolScores);


    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: waterTimes,
            datasets: [
                {
                    label: 'Water Intake',
                    data: waterIntake,
                    backgroundColor: lightBlue,
                    borderColor: blue,
                    borderWidth: 1,
                    yAxisID: "y-water"
                },{
                    label: 'bristol score',
                    data: bristolScores,
                    backgroundColor:[lightOrange],
                    borderColor:[orange],
                    type: 'line',
                    yAxisID:"y-bristol"
                }
            ]
        },
        options: {
            responsive: true,
            stacked: false,
            hoverMode: 'index',
            title: {
                display: true,
                text: 'Stool Stats'
            },

            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        parser: timeFormat,
                        round: 'hour',
                        
                        tooltipFormat: 'll HH:mm',
                        // displayFormats: {
                        //     // day:'MMM D',
                        //     minute:'h:mm a'
                        // }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: "left",
                    id: "y-water",
                    ticks: {
                        beginAtZero: true,
                        min: 0
                    }
                }, {
                    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: "right",
                    id: "y-bristol",

                    // grid line settings
                    gridLines: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                    ticks: {
                        beginAtZero: true,
                        min: 0
                    }
                }],
            }

        }
    });

    return myChart;
}






const timeFormat = "YYYY-DD-MM HH:mm"

function newDate(days) {
    return moment().add(days, 'd').toDate();
}

function newDateString(days) {
    return moment().add(days, 'd').format(timeFormat);
}
console.log(newDate(0))
console.log(newDateString(0));

displayChart();

