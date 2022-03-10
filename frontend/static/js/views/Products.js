import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor(params) {
        super(params);

    }

    async getHtml() {

        // Fetch list of products
        const apiUrl = `http://127.0.0.1:8000/products/`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const items = data

        const itemList = items.map(
            ({ id, item_code, title, description, price, category, user_creator }) => `
                    <tr class="p-row-all" id="${id}" data-link>
                        <td>${item_code}</td>
                        <td>${title}</td>
                        <td>${description}</td>
                        <td>${price}</td>
                        <td>${category}</td>
                        <td>${user_creator}</td>
                        <td><a class="btn btn-sm btn-outline-secondary" href="/details/${id}" data-link>Details</a></td>
                    </tr>
                `
        ).join('\n');

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
                        <form>
                            <input type="date" id="date" name="date" class="btn btn-sm btn-outline-secondary">
                            <button type="submit" id="submitDate" class="btn btn-sm btn-outline-secondary">Go</button>
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
                                <form>
                                    <div class="modal-body"> 
                                        <div class="col-lg">
                                            <label for="" class="col-form-label">Code:</label>
                                            <input id="filesToUpload" name="filesToUpload" type="file" class="form-control" multiple>
                                            <span id="status"><span>
                                        </div>
                                        <div class="col-lg">
                                            <label for="" class="col-form-label">Code:</label>
                                            <input type="text" class="form-control" id="item_code" name="item_code" value="">
                                        </div>
                                        <div class="col-lg">
                                            <label for="" class="col-form-label">Title</label>
                                            <input type="text" class="form-control" id="title" name="title" value="">
                                        </div>
                                        <div class="col-lg">
                                            <label for="" class="col-form-label">Description</label>
                                            <textarea class="form-control" id="description" name="description" value=""></textarea>
                                        </div>
                                        <div class="col-md-4">
                                            <label for="" class="col-form-label">Price</label>
                                            <input type="number" class="form-control" id="price" name="price" value=""></input>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="submit" id="upload" class="btn btn-primary">Create</button>
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
                        <tbody id="t-body">${itemList}</tbody>
                    </table>
                </div>
            </main>`;
    }

    async after_render() {

        // Searching from top input date
        document.querySelector('#submitDate').addEventListener("click", function (e) {
            e.preventDefault();
            let date = document.querySelector('#date').value;
            console.log(date)
        });

        document.querySelector('#upload').addEventListener('click', (e) => {
            e.preventDefault();

            const item_code = document.querySelector('#item_code').value;
            const title = document.querySelector('#title').value;
            const description = document.querySelector('#description').value;
            const price = document.querySelector('#price').value;

            fetch('http://127.0.0.1:8000/products/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    item_code: item_code,
                    title: title,
                    description: description,
                    price: price
                }),
            })
                .then(response => response.json())
                .then(res => {
                    console.log(res)
                    window.location.reload()
                })
        });





        /*  // Form method to get new product added
         document.addEventListener('DOMContentLoaded', init, false);
 
         async function init() {
             const fileField = document.querySelector('#filesToUpload');
             const statusDiv = document.querySelector('#status');
             document.querySelector('#upload').addEventListener('click', doUpload, false);
         }
 
         async function doUpload(e) {
             e.preventDefault();
             statusDiv.innerHTML = '';
 
             let totalFilesToUpload = fileField.files.length;
 
             if (totalFilesToUpload === 0) {
                 statusDiv.innerHTML = 'Please select one or more files.';
                 return;
             }
 
             statusDiv.innerHTML = `Uploading ${totalFilesToUpload} files.`;
 
             let uploads = [];
             console.log(uploads)
             for (let i = 0; i < totalFilesToUpload; i++) {
                 uploads.push(uploadFile(fileField.files[i]));
             }
 
             await Promise.all(uploads);
 
             statusDiv.innerHTML = 'All complete.';
             fileField.value = '';
         }
 
 
         async function uploadFile(f) {
             let form = new FormData();
             form.append('photosUploads', f);
             const resp = fetch('http://127.0.0.1:8000/products/',
                 {
                     method: 'POST', headers: { 'Content-Type': 'application/json' }, mode: 'no-cors', body: form,
                 });
             const data = await (resp => resp.json()).then(res => console.log(res));
             console.log(data)
             return data;
         } */
    }
}

