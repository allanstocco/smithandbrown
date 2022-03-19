import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);

    }

    async getHtml() {

        const apiUrl = `http://127.0.0.1:8000/orders/`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const orders = data

        const ordersList = orders.map(
            ({ Qty, job_number, description, code, supplier }) => `
                    <tr class="p-row-all" data-link>
                        <td>${Qty}</td>
                        <td>${job_number}</td>
                        <td>${description}</td>
                        <td>${code}</td>
                        <td>${supplier}</td>
                    </tr>
                `
        ).join('\n');

        return `
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div
                class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Orders</h1>
                <div class="btn-toolbar mb-2 mb-md-0"></div>
            </div>
            <div id="add-orders-div">
                <div id="cont" class="table-responsive-lg"></div>
                <p>
                    <input type="button" id="new-order" class="btn btn-sm btn-outline-secondary" value="New Order">
                    <input class="btn btn-sm btn-outline-secondary" type="button" id="btn-add" value="Add Request">
                    <input class="btn btn-sm btn-outline-secondary" type="button" id="btn-submit" value="Submit">
                </p>
            </div>
            <div id="show-orders-div">
                <div class="table-responsive">
                    <table class="table table-md">
                        <tbody id="t-body">${ordersList}</tbody>
                    </table>
                </div>
            </div>
        </main>`
    }

    async after_render() {

        let arrHead = [];
        let arrOrders = [];
        arrHead = ['Qty', 'Job', 'Description', 'Code', 'Supplier', ''];

        document.getElementById('cont').style.display = 'none';


        function createTable() {
            var empTable = document.createElement('table');
            empTable.setAttribute('id', 'empTable');
            empTable.setAttribute('class', 'table');

            var tr = empTable.insertRow(-1);
            for (var h = 0; h < arrHead.length; h++) {
                var th = document.createElement('th');
                th.innerHTML = arrHead[h];
                tr.appendChild(th);
            }
            var div = document.getElementById('cont');
            div.appendChild(empTable);
        }

        createTable()
        function addRow() {

            document.getElementById('cont').style.display = 'block';

            var empTab = document.getElementById('empTable');
            var rowCnt = empTab.rows.length;
            var tr = empTab.insertRow(rowCnt);
            tr = empTab.insertRow(rowCnt);

            for (var c = 0; c < arrHead.length; c++) {
                var td = document.createElement('td');
                td = tr.insertCell(c);

                if (c == 5) {
                    var button = document.createElement('input');
                    button.setAttribute('type', 'button');
                    button.setAttribute('value', 'Remove');
                    button.setAttribute('class', 'input-orders btn btn-sm btn-outline-secondary');
                    button.setAttribute('id', 'btn-delete');

                    td.appendChild(button);
                }
                else {
                    var ele = document.createElement('input');
                    ele.setAttribute('type', 'text');
                    ele.setAttribute('value', '');
                    ele.setAttribute('class', 'input-orders');
                    ele.setAttribute('style', 'text-transform:uppercase');

                    td.appendChild(ele);
                }
            }
        }

        function removeRow(oButton) {
            var empTab = document.getElementById('empTable');
            empTab.deleteRow(oButton);
        }

        function addOrder(arrOrders) {

            var myTab = document.getElementById('empTable');
            var Values = new Object();

            for (let row = 1; row < myTab.rows.length - 1; row++) {
                for (let c = 0; c < myTab.rows[row].cells.length; c++) {
                    var element = myTab.rows.item(row).cells[c];
                    if (element.childNodes[0].getAttribute('type') == 'text') {
                        Values[arrHead[c]] = element.childNodes[0].value;
                    }
                }

            }
            arrOrders.push(Values)
        }

        function submitOrder() {

            for (let i = 0; i < arrOrders.length; i++) {

                fetch(`http://127.0.0.1:8000/orders/`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'Qty': arrOrders[i]['Qty'],
                        'job_number': arrOrders[i]['Job'],
                        'description': arrOrders[i]['Description'],
                        'code': arrOrders[i]['Code'],
                        'supplier': arrOrders[i]['Supplier']
                    }),
                })
                window.location.reload()
            }
            console.log(arrOrders)
        }


        document.querySelector('#new-order').addEventListener('click', (e) => {
            addRow();
        }, false)

        document.querySelector('#btn-add').addEventListener('click', () => {
            addOrder(arrOrders)
        })
        document.querySelector('#btn-submit').addEventListener('click', () => {
            submitOrder();
        })
    }
}