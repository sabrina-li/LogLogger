const displayChart = (data) => {
    const canvas = document.getElementById("poopChart");
    const ctx = canvas.getContext("2d");
    // Make it visually fill the positioned parent
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const lightBlue = "rgba(54, 162, 235, 0.2)",
        blue = "rgba(54, 162, 235, 1)",
        lightOrange = "rgba(255, 159, 64, 0.2)",
        orange = "rgba(255, 159, 64, 1)";

    const timeFormat = "YYYY-MM-DDTHH:mm:ss:SSSZ";
    moment.defaultFormat = timeFormat;

    //TODO:clean up code! Remove redundancy!
    const waterData = data.water;//from dummy_Data
    let waterChartData, stoolChartData, foodChartData, timelineX = [];
    if (waterData) {
        timelineX = timelineX.concat(waterData.map(x => x.time));
        waterData.sort((a, b) => {
            return moment(a.time) - moment(b.time);
        });
        waterChartData = waterData.map(water => {
            let result = {};
            result.y = water.intake;
            result.x = moment(water.time);
            return result;
        });
    }
    const foodData = data.food;
    if (foodData) {
        timelineX = timelineX.concat(foodData.map(x => x.time));
        foodData.sort((a, b) => {
            return moment(a.time) - moment(b.time);
        });
        foodChartData = foodData.map(food => {
            let result = {};
            result.y = 0;
            result.x = moment(food.time);
            result.comment = food.comment;
            return result;
        });
    }
    const stoolData = data.stool;//from dummy_Data
    if (stoolData) {
        timelineX = timelineX.concat(stoolData.map(x => x.time));
        stoolData.sort((a, b) => {
            return moment(a.time) - moment(b.time);
        });
        stoolChartData = stoolData.map(stool => {
            let result = {};
            result.y = stool.score;
            result.x = moment(stool.time);
            result.comment = stool.comment;
            return result;
        });
    }

    console.log(timelineX);
    var chartData = {
        // labels: timelineX,
        datasets: [{
            type: "line",
            label: "Bristol Score",
            backgroundColor: lightOrange,
            borderColor: orange,
            fill: false,
            data: stoolChartData,
            yAxisID: "y-bristol"
        }, {
            type: "bar",
            label: "Water Intake",
            backgroundColor: lightBlue,
            borderColor: blue,
            data: waterChartData,
            borderWidth: 2,
            yAxisID: "y-water",
        }]
    };


    const myChart = new Chart(ctx, {
        type: "bar",
        data: chartData,
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
                        tooltipFormat: "ll HH:mm",
                        // unit:"day",
                        // unitStepSize: 1,
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
                        labelString: "Date-Time"
                    }
                }],
                yAxes: [
                    {
                        type: "linear",
                        // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: "left",
                        id: "y-water",
                        scaleLabel: {
                            display: true,
                            labelString: "Water (ml)",
                        },
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            callback: function (value, index, values) {
                                return value + "ml";
                            }
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
                        scaleLabel: {
                            display: true,
                            labelString: "Bristol Score",
                        },
                        ticks: {
                            beginAtZero: true,
                            min: 0,
                            max: 7
                        }
                    }],
            }

        }
    });

    return myChart;
};

API.getAllData().then((res) => {
    console.log(res);
    displayChart(res);
});



