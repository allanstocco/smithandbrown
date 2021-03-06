import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params)
        this.getId = params.id
    }


    async getHtml() {

        const apiUrl = `http://127.0.0.1:8000/edit/${this.getId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const items = data

        const itemList =
            `
         <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div class="btn-toolbar mb-2 mb-md-0">
                        <a type="button" class="btn btn-sm btn btn-outline-dark" href="/products/details/${items.id}" data-link>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16" data-link>Back
                                <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" data-link/>
                                Back
                            </svg>
                            Back
                        </a>
                    </div>
                </div>
                <div>
                    <form>
                        <div class="row g-3">
                            <div class="col-sm-3">
                                <label><strong>Code:</strong></label>
                                <input id="code" type="text" class="form-control" value="${items.item_code}">
                            </div>
                            <div class="col-sm-9">
                                <label><strong>Title:</strong></label>
                                <input id="title" type="text" class="form-control" value="${items.title}">
                            </div>
                        </div>
                        <br>
                        <div class="row g-3">
                            <div class="col-sm-12">
                                <label><strong>Description:</strong></label>
                                <textarea id="description" type="text" rows="4" cols="50" class="form-control">${items.description}</textarea>
                            </div>
                        </div>
                        <br>
                        <div class="col-lg">
                            <label for="" class="col-form-label"><strong>Category:</strong></label>
                            <select class="form-select" id="category">
                                <option selected disabled>${items.category}</option>                                           
                                <option value="Spray">Spray</option>                                           
                                <option value="Machinery">Machinery</option>                                           
                                <option value="General Stock">General Stock</option>                                           
                                <option value="Joinery">Joinery</option>                                           
                            </select>
                        </div>
                        <br>
                        <br>
                        <button id="submit-edit" type="submit" class="btn btn-sm btn btn-outline-dark">Submit</button>
                         
                    </form>
                </div>
            </main>`;

        return itemList;

    };

    async after_render() {

        document.querySelector('#submit-edit').addEventListener('click', (e) => {

            e.preventDefault();

            let code = document.querySelector('#code').value;
            let title = document.querySelector('#title').value;
            let description = document.querySelector('#description').value;
            let category = document.querySelector('#category').value;

            fetch(`http://127.0.0.1:8000/edit/${this.getId}`, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "item_code": code,
                    "title": title,
                    "description": description,
                    "category": category
                }),
            }).then(res => res.json())
                .then(response => {
                    window.location.href = `http://127.0.0.1:3000/products/details/${this.getId}`
                })
        })
    }

}