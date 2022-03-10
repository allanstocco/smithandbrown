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
                        <a type="button" class="btn btn-inline-secondary" href="/details/${items.id}" data-link>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16" data-link>Details
                                <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" data-link/>
                                Details
                            </svg>
                            Details
                        </a>
                    </div>
                </div>
                <div>
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Code</label>
                            <input type="email" class="form-control" value="${items.item_code}" id="exampleInputEmail1" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Title</label>
                            <input type="email" class="form-control" value="${items.title}" id="exampleInputEmail1" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Description</label>
                            <input type="email" class="form-control" value="${items.description}" id="exampleInputEmail1" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Price</label>
                            <input type="number" class="form-control" value="${items.price}" id="exampleInputEmail1" aria-describedby="emailHelp">
    
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Category</label>
                            <select class="form-control id="category">
                                <option selected="selected"></option>
                                <option value="General Workshop">General Workshop</option>
                                <option value="Spray Items">Spray Items</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </main>`;

        return itemList;

    };

    async after_render() {

    }

}