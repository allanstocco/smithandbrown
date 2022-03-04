import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params) {
        super(params);
    }


    async getHtml() {

        fetch(`http://127.0.0.1:8000/products/`)
            .then(res => res.json())
            .then(result => {
                result.forEach(data => {

                    const bar = document.querySelector('#myChartBar');
                    const line = document.querySelector('#myChartLine');

                    var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
                    var yValues = [2, 49, 44, 24, 15];
                    var barColors = [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ]
                    var barBorderColor = [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ]

                    new Chart(bar, {
                        type: 'bar',
                        data: {
                            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                            datasets: [{
                                label: xValues,
                                data: yValues,
                                backgroundColor: barColors,
                                borderColor: barBorderColor,
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    });

                    new Chart(line, {
                        type: "polarArea",
                        data: {
                            labels: xValues,
                            datasets: [{
                                borderColor: barBorderColor,
                                backgroundColor: barColors,
                                borderWidth: 1,
                                data: yValues
                            }],
                            options: {}
                        }
                    });


                })
            })

        return `
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div
                class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Dashboard</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                    <div class="btn-group me-2">
                        <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span data-feather="calendar"></span>
                        This week
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <canvas id="myChartBar" style="width:50%;"></canvas>
                </div>
                <div class="col-sm-6">
                    <canvas id="myChartLine" style="width:50%;"></canvas>
                </div>
            </div>
        </main>`

    }

}