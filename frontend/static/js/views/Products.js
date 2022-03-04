import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor(params) {
        super(params);

    }

    async getHtml() {

        fetch(`http://127.0.0.1:8000/products/`)
            .then(res => res.json())
            .then(result => {
                const myForm = document.querySelector('#myForm');

                myForm.addEventListener('submit', (element) => {

                    element.preventDefault();

                    const code = document.getElementById('code').value;
                    const title = document.getElementById('title').value;
                    const description = document.getElementById('description').value;
                    const price = document.getElementById('price').value;
                    //const category = document.getElementById('category');

                    fetch(`http://127.0.0.1:8000/products/`, {
                        method: 'post',
                        body: JSON.stringify({
                            item_code: code,
                            title: title,
                            description: description,
                            price: price,
                            //category: category
                        }),
                    }).then(response => response.json())
                        .then(res => {
                            window.location.reload()
                        })
                })

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
                        <td><a class="button" href="/details/${data.id}" data-link>Details</a></td>
                        </tr>
                        `;
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
                    <div class="modal custom fade" id="modal" tabindex="-1" aria-labelledby="" aria-hidden="true">
                        <div class="modal-dialog modal-sm">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">New Product</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <form id="myForm" method="post" enctype="multipart/form-data">
                                    <div class="modal-body"> 
                                        <div class="col-lg">
                                            <label for="recipient-name" class="col-form-label">Code:</label>
                                            <input type="text" class="form-control" id="code" value="">
                                        </div>
                                        <div class="col-lg">
                                            <label for="recipient-name" class="col-form-label">Title</label>
                                            <input type="text" class="form-control" id="title" value="">
                                        </div>
                                        <div class="col-lg">
                                            <label for="recipient-name" class="col-form-label">Description</label>
                                            <textarea class="form-control" id="description" value=""></textarea>
                                        </div>
                                        <div class="col-md-4">
                                            <label for="recipient-name" class="col-form-label">Price</label>
                                            <input type="number" class="form-control" id="price" value=""></input>
                                        </div>
                                        <div class="col-lg">
                                            <label for="message-text" class="col-form-label">Category</label>
                                            <select class="form-control id="category" value="">
                                                <option value="Spray">Spray</option>
                                                <option value="">Test</option>
                                                <option value="">Test</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="submit" class="btn btn-primary">Create</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- End Modal -->
                </div>
                <!-- Items Content -->
                <h2>Products / Items</h2>
                <div class="table-responsive">
                    <table class="table table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Category</th>
                                <th scope="col">Registered</th>
                            </tr>
                        </thead>
                        <tbody id="t-body"></tbody>
                    </table>
                </div>
            </main>`;

    }
}