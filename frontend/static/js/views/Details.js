import AbstractView from "./AbstractView.js";


export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.ProductID = params.id
    }

    async getHtml() {

        return `
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group me-2">
                <a type="button" class="btn btn-sm btn-outline-secondary" href="/products" data-link>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16" data-link>Back
                                <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" data-link/>
                                Back
                            </svg>
                            Back
                        </a>
                <a class="btn btn-sm btn-outline-secondary" href="/edit/${this.ProductID}" data-link>Edit</a>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <div class="swiper mySwiper">
                        <div class="swiper-wrapper"></div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
                <div class="col-sm-6" id="show-prod"></div>
            </div>
        </div>
    </main>`;
    }

    async after_render() {
        fetch(`http://127.0.0.1:8000/details/${this.ProductID}`)

            .then(res => res.json())
            .then(data => {
                const ProdDiv = document.querySelector('#show-prod');
                const PhotoDiv = document.querySelector('.swiper-wrapper');
                const showPhoto = []

                function ShowProd(data) {
                    return `
                    <h1 class="p-title">
                        <span>${data.title}</span>
                        <span style="font-size:15px;">(${data.item_code})</span>
                    </h1>
                    <hr/>
                    <p class="p-description">${data.description}</p>
                    <div class="profileProducts">
                        <span>Registered by: ${data.user_creator}</span>
                    </div>
                    <div class="profileProducts">
                        <span>Registered: ${data.created}</span>
                    </div>`
                }

                ProdDiv.innerHTML = ShowProd(data)


                // Get photos of data throught fetch
                for (let photo of data.photos) {
                    showPhoto.push(photo.image.full_size)
                };

                for (let i = 0; i < showPhoto.length; i++) {
                    PhotoDiv.innerHTML += `<img style="width: 500px; height:500px" class="swiper-slide" src="http://127.0.0.1:8000${showPhoto[i]}">`
                };
            })


        // Swiper JS
        var swiper = new Swiper(".mySwiper", {
            pagination: {
                el: ".swiper-pagination",
            },
        });
    }
}