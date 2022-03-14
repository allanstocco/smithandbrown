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
            ({ id, item_code, title, description, created, user_creator }) => `
                    <tr class="p-row-all" id="${id}" data-link>
                        <td>${item_code}</td>
                        <td>${title}</td>
                        <td>${description}</td>
                        <td>${created}</td>
                        <td>${user_creator}</td>
                        <td><a class="btn btn-sm btn-outline-secondary" href="/products/details/${id}" data-link>Details</a></td>
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
                            <button type="submit" id="submitDate" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Go</button>
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
                                            <input class="form-control" type="file" id="filesToUpload"  multiple>
                                            <span id="status"><span>
                                        </div>
                                        <div class="col-lg">
                                            <label for="" class="col-form-label">Code:</label>
                                            <input class="form-control" type="text" id="item_code">
                                        </div>
                                        <div class="col-lg">
                                            <label for="" class="col-form-label">Title</label>
                                            <input class="form-control" type="text" id="title">
                                        </div>
                                        <div class="col-lg">
                                            <label for="" class="col-form-label">Description</label>
                                            <textarea class="form-control" id="description"></textarea>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button class="btn btn-primary" type="submit" id="upload">Create</button>
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
                    <table class="table table-md">
                        <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Date</th>
                                <th scope="col">Registered</th>
                            </tr>
                        </thead>
                        <tbody id="t-body">${itemList}</tbody>
                    </table>
                </div>
            </main>`;
    };

    async after_render() {

        // Searching from top input date
        document.querySelector('#submitDate').addEventListener("click", Filter, false);

        async function Filter(e) {

            e.preventDefault();

            const apiUrl = `http://127.0.0.1:8000/products/`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            const items = data;

            const filter = document.querySelector('#content-filter');
            const noneFilter = document.querySelector('#no-content-filter');
            const date = document.querySelector('#date').value;

            filter.innerHTML = '';
            for (let i = 0; i < items.length; i++) {
                if (items[i].created === date) {
                    filter.innerHTML += `
                        <tr scope="row" class="p-row-all" id="${items[i].id}" data-link>
                            <td>${items[i].item_code}</td>
                            <td>${items[i].title}</td>
                            <td><a class="btn btn-sm btn-outline-secondary" href="/products/details/${items[i].id}" data-bs-dismiss="modal" data-link>See</a></td>
                        </tr>`
                } else {
                    noneFilter.innerHTML = `
                        <tr>
                            <td>There is a total of ${i + 1} items registered in the database.</td>
                        </tr>`;
                };
            };

        };

        document.querySelector('#upload').addEventListener('click', (e) => {
            e.preventDefault();

            const item_code = document.querySelector('#item_code').value;
            const title = document.querySelector('#title').value;
            const description = document.querySelector('#description').value;
            const fileField = document.querySelector('#filesToUpload');
            const statusDiv = document.querySelector('#status');


            statusDiv.innerHTML = '';

            let totalFilesToUpload = fileField.files.length;

            if (totalFilesToUpload === 0) {
                statusDiv.innerHTML = 'Please select one or more files.';
                return;
            }


            const formData = new FormData();
            for (let i = 0; i < totalFilesToUpload; i++) {
                statusDiv.innerHTML = `Working on file ${i + 1} of ${totalFilesToUpload}`;
                formData.append('image', fileField.files[i]);
                console.log(`Done with ${i + 1} item.`);
            }

            statusDiv.innerHTML = 'All complete.';
            fileField.value = '';

            formData.append('item_code', item_code);
            formData.append('title', title);
            formData.append('description', description);
            fetch('http://127.0.0.1:8000/products/',
                {
                    method: 'POST', mode: 'no-cors', body: formData
                })
        })
    }

}

/* fetch('http://127.0.0.1:8000/products/', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        item_code: item_code,
        title: title,
        description: description,
        image: pictures
    }),
})
    .then(response => response.json())
    .then(res => {
        console.log(res)
        window.location.reload()
    })
}); */




        // Form method to get new product added

/* document.querySelector('#upload').addEventListener('click', doUpload, false);
const fileField = document.querySelector('#filesToUpload');
const statusDiv = document.querySelector('#status');
const item_code = document.querySelector('#item_code').value;
const title = document.querySelector('#title').value;
const description = document.querySelector('#description').value;


async function doUpload(e) {
    e.preventDefault();
    statusDiv.innerHTML = '';

    let totalFilesToUpload = fileField.files.length;

    //nothing was selected 
    if (totalFilesToUpload === 0) {
        statusDiv.innerHTML = 'Please select one or more files.';
        return;
    }

    for (let i = 0; i < totalFilesToUpload; i++) {
        statusDiv.innerHTML = `Working on file ${i + 1} of ${totalFilesToUpload}`;
        let resp = await uploadFile(fileField.files[i]);
        console.log(`Done with ${i + 1} item.`);
    }

    statusDiv.innerHTML = 'All complete.';
    fileField.value = '';
}

async function uploadFile(f) {
    let form = new FormData();
    form.append('item_code', item_code)
    form.append('title', title)
    form.append('description', description)
    form.append('image', f);
    let resp = await fetch('http://127.0.0.1:8000/products/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, mode: 'no-cors', body: form });
    let data = await (resp => resp.json()).then(res => console.log(res));

    console.log(data)

    return data;
}*/


