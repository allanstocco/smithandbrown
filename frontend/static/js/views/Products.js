import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor(params) {
        super(params);

    }

    async getHtml() {
        const User = sessionStorage.getItem('username');
        const apiUser = `http://127.0.0.1:8000/users/${User}`;
        const result = await fetch(apiUser);
        const UserData = await result.json();

        // Fetch list of products
        const apiUrl = `http://127.0.0.1:8000/products/`;
        const response = await fetch(apiUrl)
        const data = await response.json();
        const items = data
        // Render mapping throught list
        const itemList = items.map(
            ({ id, item_code, title, description, created }) => `
                    <tr class="p-row-all" id="${id}" data-link>
                        <td>${item_code}</td>
                        <td>${title}</td>
                        <td id="desc-res">${description.substring(0, 35)}...</td>
                        <td id="date-res">${moment(created).format('DD/MM/YYYY')}</td>
                        <td id="regs-res">${UserData.first_name}</td>
                        <td id="actions">
                            <a class="btn btn-sm btn btn-dark" href="/products/details/${id}" data-link>Details</a>
                            <a class="btn btn-sm btn btn-dark del" data-link>
                                <i class="icon-trash" id="${id}"></i>
                            </a>
                        </td>
                    </tr>
                `
        ).join('\n');

        return `
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Products / Items</h1>
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <div class="btn-group me-2">
                            <button type="button" class="btn btn-sm btn btn-outline-dark" data-bs-toggle="modal"
                                data-bs-target="#modal">Add</button>
                        </div>
                        <form>
                            <input type="date" id="date" name="date" class="btn btn-sm btn-outline-secondary">
                            <button type="submit" id="submitDate" class="btn btn-sm btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Go</button>
                        </form>
                        <div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Product Date Register</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="table-responsive">
                                            <table class="table table-md">
                                                <p id="no-content-filter"></p>
                                                <p id="counter-content-filter"></p>
                                                <tbody id="content-filter"></tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Init Modal -->
                    <div class="modal custom fade" id="modal" tabindex="-1" aria-labelledby="" aria-hidden="true">
                        <div class="modal-dialog modal-md">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">New Product</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <form>
                                    <div class="modal-body"> 
                                        <div class="col-lg">
                                            <input class="form-control" type="file" id="filesToUpload" multiple/>
                                            <span id="status"><span>
                                        </div>
                                        <div class="col-lg">
                                            <label for="" class="col-form-label">Code:</label>
                                            <input class="form-control" type="text" id="item_code"/>
                                        </div>
                                        <div class="col-lg">
                                            <label for="" class="col-form-label">Title</label>
                                            <input class="form-control" type="text" id="title"/>
                                        </div>
                                        <div class="col-lg">
                                            <label for="" class="col-form-label">Description</label>
                                            <textarea class="form-control" id="description"></textarea>
                                        </div>
                                        <div class="col-lg">
                                            <label for="" class="col-form-label">Supplier</label>
                                            <input class="form-control" id="supplier"/>
                                        </div>
                                        <div class="col-lg">
                                            <label for="" class="col-form-label">Category</label>
                                            <select class="form-select" id="category">
                                                <option selected disabled></option>                                           
                                                <option value="Spray">Spray</option>                                           
                                                <option value="Machinery">Machinery</option>                                           
                                                <option value="General Stock">General Stock</option>                                           
                                                <option value="Joinery">Joinery</option>                                           
                                            </select>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-dark" type="submit" id="upload">Create</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- End Modal -->
                </div>
                <!-- Items Content -->
                <div class="table-responsive">
                    <table class="table table-sm">
                        <thead id="t-head-prods">
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Title</th>
                                <th id="desc-res" scope="col">Description</th>
                                <th id="date-res" scope="col">Date</th>
                                <th id="regs-res" scope="col">Registered ID</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="t-body">${itemList}</tbody>
                    </table>
                </div>
            </main>`;
    };

    async after_render() {

        const User = sessionStorage.getItem('username');
        const apiUser = `http://127.0.0.1:8000/users/${User}`;
        const resp = await fetch(apiUser);
        const UserData = await resp.json();

        // Filtering searches by date
        document.querySelector('#submitDate').addEventListener("click", Filter, false);

        async function Filter(e) {
            e.preventDefault();

            // Fetch Products
            const apiUrl = `http://127.0.0.1:8000/products/`;
            const response = await fetch(apiUrl)
            const data = await response.json();
            const items = data;

            const filter = document.querySelector('#content-filter');
            const noneFilter = document.querySelector('#no-content-filter');
            const counter = document.querySelector('#counter-content-filter');
            const date = document.querySelector('#date').value;

            // Render results in modal once any date was picked
            let sum = 0
            filter.innerHTML = '';
            counter.innerHTML = '';
            noneFilter.innerHTML = '';
            noneFilter.style.display = '';

            for (let i = 0; i < items.length; i++) {
                if (items.length > 0 && items[i].created === date) {
                    noneFilter.style.display = 'none';
                    counter.innerHTML = `
                    <tr>
                        <td>${sum += 1} items found.</td>
                    </tr>`;
                    filter.innerHTML += `
                            <td>${items[i].item_code}</td>
                            <td>${items[i].title}</td>
                            <td><a class="btn btn-sm btn-outline-secondary" href="/products/details/${items[i].id}" data-bs-dismiss="modal" data-link>See</a></td>
                        </tr>`
                };

                if (items.length) {
                    noneFilter.innerHTML = `                       
                    <tr>
                        <td>Could not find any for this date.</td>
                    </tr>`;
                };
            };
        };


        // Add Product method
        document.querySelector('#upload').addEventListener('click', (e) => {
            e.preventDefault();

            const item_code = document.querySelector('#item_code').value;
            const title = document.querySelector('#title').value;
            const description = document.querySelector('#description').value;
            const category = document.querySelector('#category').value
            const supplier = document.querySelector('#supplier').value
            const fileField = document.querySelector('#filesToUpload');
            const statusDiv = document.querySelector('#status');

            const formData = new FormData();

            statusDiv.innerHTML = '';

            let totalFilesToUpload = fileField.files.length;

            if (totalFilesToUpload === 0) {
                statusDiv.innerHTML = 'Please select one or more files.';
                return;
            }

            for (let i = 0; i < totalFilesToUpload; i++) {
                statusDiv.innerHTML = `Working on file ${i + 1} of ${totalFilesToUpload}`;
                formData.append('image', fileField.files[i]);
                console.log(`Done with ${i + 1} item.`);
            }

            statusDiv.innerHTML = 'All complete.';

            formData.append('item_code', item_code);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('supplier', supplier);
            formData.append('user_creator', UserData.id);

            fetch('http://127.0.0.1:8000/products/',
                {
                    method: 'POST', mode: 'cors', body: formData
                })
                .then(window.location.reload())
        })


        document.querySelector('.icon-trash').addEventListener('click', (e) => {

            const del = e.target.id

            if (window.confirm("Are you sure you want to delete this?")) {
                fetch(`http://127.0.0.1:8000/delete/${del}`, {
                    method: "delete"
                })
            };
        })

    }

}


