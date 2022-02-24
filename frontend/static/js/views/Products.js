import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor(params) {
        super(params);
        this.setTitle("Products")
    }

    async getHtml() {

        fetch(`http://127.0.0.1:8000/products/`)
            .then(res => res.json())
            .then(result => {
                result.forEach(data => {
                    let div = document.querySelector('#t-body');
                    div.innerHTML +=
                        `
                        <tr id='p-row-all'>
                        <td>${data.item_code}</td>
                        <td>${data.title}</td>
                        <td>${data.description}</td>
                        <td>${data.price}</td>
                        <td>${data.category}</td>
                        <td>${data.user_creator}</td>
                        <td><a href="/details/${data.id}" data-link>Ver</a></td>
                        </tr>
                        `
                })
            })

        return `
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div
                    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Items</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group me-2">
                            <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal"
                                data-bs-target="#modal">Add</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
                        </div>
                        <form id="calendar" method="post">
                            <input type="date" id="date" name="date" class="btn btn-sm btn-outline-secondary">
                        </form>
                    </div>
                    <!-- Init Modal -->
                    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="" aria-hidden="true">
                        <div class="modal-dialog modal-sm">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">New Product</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="col-lg">
                                            <label for="recipient-name" class="col-form-label">Code:</label>
                                            <input type="text" class="form-control" id="recipient-name">
                                        </div>
                                        <div class="col-lg">
                                            <label for="recipient-name" class="col-form-label">Title</label>
                                            <input type="text" class="form-control" id="recipient-name">
                                        </div>
                                        <div class="col-lg">
                                            <label for="recipient-name" class="col-form-label">Description</label>
                                            <textarea class="form-control" id="message-text"></textarea>
                                        </div>
                                        <div class="col-md-4">
                                            <label for="recipient-name" class="col-form-label">Price</label>
                                            <input type="number" class="form-control" id=""></input>
                                        </div>
                                        <div class="col-lg">
                                            <label for="message-text" class="col-form-label">Category</label>
                                            <select id="" name="">
                                                <option value="volvo">Test</option>
                                                <option value="volvo">Test</option>
                                                <option value="volvo">Test</option>
                                            </select>
                                        </div>

                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Send message</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Modal -->
                </div>
                <!-- Items Content -->
                <h2>Products / Items</h2>
                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Category</th>
                                <th scope="col">Registered By</th>
                            </tr>
                        </thead>
                        <tbody id="t-body"></tbody>
                    </table>
                </div>
            </main>`;

    }
}