import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.prodID = params.id
        this.setTitle("Settings");
    }



    async getHtml() {
        fetch(`http://127.0.0.1:8000/details/${this.prodID}`)
            .then(res => res.json())
            .then(data => {
                const div = document.querySelector('#show-prod');
                const PhotoDiv = document.querySelector('#show-photo');
                const showPhoto = []


                for (let photo of data.photos) {
                    showPhoto.push(photo.photosUploads)
                };

                function showPicture(value) {
                    return `<img class="showPhoto" src="http://127.0.0.1:8000${value}">`;
                };

                div.innerHTML =
                    `${showProd(data)}`

                function showProd(data) {
                    return `
                    <h4>${data.title}</h4>
                    <h4>${data.description}</h4>
                    <h4>${data.price} GBP</h4>
                    <h4>Category: ${data.category}</h4>
                    <h4>Code: ${data.item_code}</h4>
                    <h4>Creator: ${data.user_creator}</h4>
                    `
                }

                for (let i = 0; i < showPhoto.length; i++) {
                    PhotoDiv.innerHTML += `${showPicture(showPhoto[i])}`
                };

                PhotoDiv.innerHTML =
                    `${showPicture(value)}`
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
        <div class="col-sm-6" id="show-photo"></div>
        <div class="col-sm-6" id="show-prod"></div>
        </div>
    </main>`;
    }
}