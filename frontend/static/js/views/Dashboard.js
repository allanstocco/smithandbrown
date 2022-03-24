import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params) {
        super(params);
    }


    async getHtml() {
        return `
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div
                class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Dashboard</h1>
                <div class="btn-toolbar mb-2 mb-md-0"></div>
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

    async after_render() {

        // Bar Chart 
        const BChartData = `http://127.0.0.1:8000/products/`;
        const Bresponse = await fetch(BChartData);
        const Bar_data = await Bresponse.json();
        const products = Bar_data;

        let spray = 0;
        function prods_spray(spray) {
            for (var i = 0; i < products.length; i++) {
                if (products[i].category === "Spray") {
                    spray += 1;
                }
            }
            return spray;
        };

        let joinery = 0;
        function prods_joinery(joinery) {
            for (var i = 0; i < products.length; i++) {
                if (products[i].category === "Joinery") {
                    joinery += 1;
                }
            }
            return joinery;
        };

        let general = 0;
        function prods_general(general) {
            for (var i = 0; i < products.length; i++) {
                if (products[i].category === "General Stock") {
                    general += 1;
                }
            }
            return general;
        };

        let machinery = 0;
        function prods_machinery(machinery) {
            for (var i = 0; i < products.length; i++) {
                if (products[i].category === "Machinery") {
                    machinery += 1;
                }
            }
            return machinery;
        };

        const bar = document.querySelector('#myChartBar');
        const line = document.querySelector('#myChartLine');

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


        var xValues = ["Spray", "Machinery", "General Stock", "Joinery"];
        var yValues = [prods_spray(spray), prods_machinery(machinery), prods_general(general), prods_joinery(joinery)];

        new Chart(bar, {
            type: 'bar',
            data: {
                labels: xValues,
                datasets: [{
                    data: yValues,
                    backgroundColor: barColors,
                    borderColor: barBorderColor,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Storage report'
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });


        // Polar Area Chart Data
        const PAChartData = `http://127.0.0.1:8000/orders`;
        const PA_response = await fetch(PAChartData);
        const PA_data = await PA_response.json();
        const orders = PA_data;

        let accept = 0;
        function order_accepted(accept) {
            for (var i = 0; i < orders.length; i++) {
                if (orders[i].received === "checked") {
                    accept += 1;
                }
            }
            return accept;
        }

        let unaccept = 0;
        function order_unaccept(unaccept) {
            for (var i = 0; i < orders.length; i++) {
                if (orders[i].received !== "checked") {
                    unaccept += 1;
                }
            }
            return unaccept;
        }

        var polar_xValues = ["Orders Accepted", "Orders in queue"];
        var polar_yValues = [order_accepted(accept), order_unaccept(unaccept)];

        new Chart(line, {
            type: "polarArea",
            data: {
                labels: polar_xValues,
                datasets: [{
                    borderColor: barBorderColor,
                    backgroundColor: barColors,
                    borderWidth: 1,
                    data: polar_yValues
                }],
            },
            options: {
                title: {
                    display: true,
                    text: 'Orders report'
                },
            }
        });
    }
}