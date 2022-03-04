import AbstractView from "./AbstractView.js";


export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.ProductID = params.id
    }



    async getHtml() {

        fetch(`http://127.0.0.1:8000/details/${this.ProductID}`)

            .then(res => res.json())
            .then(data => {

                const ProdDiv = document.querySelector('#show-prod');
                const PhotoDiv = document.querySelector('.swiper-wrapper');
                const showPhoto = []


                function ShowProd(data) {
                    return `
                    <h1 class="p-title">${data.title}</h1>
                    <p class="p-description">${data.description}</p>
                    <div class="profileProducts">
                        <h2>Price: </h2>
                        <span>${data.price} GBP</span>
                    </div>
                    <div class="profileProducts">
                        <h2>Category: </h2>
                        <span>${data.category}</span>
                    </div>
                    <div class="profileProducts">
                        <h2>Registered by: </h2><span>${data.user_creator}</span>
                    </div>`
                } ProdDiv.innerHTML = ShowProd(data)


                // Get photos of data throught fetch
                for (let photo of data.photos) {
                    showPhoto.push(photo.photosUploads)
                };

                for (let i = 0; i < showPhoto.length; i++) {
                    PhotoDiv.innerHTML += `<img class="swiper-slide" src="http://127.0.0.1:8000${showPhoto[i]}">`
                };
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
        <div class="col-sm-6">
            <div class="swiper">
                <div class="swiper-wrapper"></div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-scrollbar"></div>
            </div>
        </div>
        <div class="col-sm-6" id="show-prod"></div>
        </div>
    </main>`;
    }
}