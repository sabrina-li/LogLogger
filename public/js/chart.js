const displayChart = (data) => {

    
    const canvas = document.getElementById("poopChart");
    const ctx = canvas.getContext("2d");
    // Make it visually fill the positioned parent
    canvas.style.width ="100%";
    canvas.style.height="100%";
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const lightBlue = "rgba(54, 162, 235, 0.2)",
        blue = "rgba(54, 162, 235, 1)",
        lightOrange = "rgba(255, 159, 64, 0.2)",
        orange = "rgba(255, 159, 64, 1)";

    const timeFormat = "YYYY-MM-DDTHH:mm:ss:SSSZ";
    moment.defaultFormat = timeFormat;

    const waterData = data.water;//from dummy_Data
    let waterIntake,waterTimes;
    if(waterData){
        waterIntake = waterData.map(x => x.intake);
        waterTimes = waterData.map(x => x.time);
    }
    const stoolData = data.stool;//from dummy_Data
    let bristolScores;
    if(stoolData){
        bristolScores = stoolData.map(x => {
            let result = {};
            result.y = x.score;
            result.x = x.time;
            result.comment = x.comment;
            return result;
        });
    }

    const myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: stoolData.map(x => x.time),
            datasets: [
                {
                    label: 'Water Intake',
                    data: waterIntake,
                    backgroundColor: lightBlue,
                    borderColor: blue,
                    borderWidth: 1,
                    yAxisID: "y-water"
                },
                {
                    label: "bristol score",
                    data: bristolScores,
                    backgroundColor:[lightOrange],
                    borderColor:[orange],
                    type: "line",
                    yAxisID:"y-bristol"
                }
            ]
        },
        options: {
            responsive: true,
            stacked: false,
            hoverMode: "index",
            title: {
                display: true,
                text: "Stool Stats"
            },

            scales: {
                xAxes: [{
                    type: "time",
                    time: {
                        parser: timeFormat,
                        // round: 'hour',
                        tooltipFormat: "ll HH:mm",
                        unit: "hour",
                        unitStepSize: 10,
                        displayFormats: {
                            "millisecond": "MMM-DD HHa",
                            "second": "MMM-DD HHa",
                            "minute": "MMM-DD HHa",
                            "hour": "MMM-DD HHa",
                            "day": "MMM-DD HHa",
                            "week": "MMM-DD HHa",
                            "month": "MMM-DD HHa",
                            "quarter": "MMM-DD HHa",
                            "year": "MMM-DD HHa"
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: "Date"
                    }
                }],
                yAxes: [
                    {
                        type: "linear",
                        // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: "left",
                        id: "y-water",
                        ticks: {
                            beginAtZero: true,
                            min: 0
                        },
                        gridLines: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                    },
                    {
                        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: "right",
                        id: "y-bristol",
                        ticks: {
                            beginAtZero: true,
                            min: 0
                        }
                    }],
            }

        }
    });

    return myChart;
};

const timeFormat = "YYYY-DD-MM HH:mm";

function newDate(days) {
    return moment().add(days, "d").toDate();
}

function newDateString(days) {
    return moment().add(days, "d").format(timeFormat);
}


API.getAllData().then((res)=>{
    console.log(res);
    displayChart(res);
});



