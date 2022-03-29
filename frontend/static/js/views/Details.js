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
                <a type="button" class="btn btn-sm btn btn-outline-dark" href="/products" data-link>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16" data-link>Back
                                <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z" data-link/>
                                Back
                            </svg>
                            Back
                        </a>
                <a class="btn btn-sm btn btn-outline-dark" href="/edit/${this.ProductID}" data-link>Edit</a>
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
                <div class="col-sm-6"> 
                    <div id="show-prod"></div>
                    <div class="add-to-order">
                        <a data-bs-toggle="modal" data-bs-target="#exampleModal">Get this product ordered</a>
                    </div> 
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-sm">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h4>Order request<h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <label>Job Reference:</label>
                                <input class="form-control" type="text" id="job"/>
                            </div>
                            <div class="modal-body">
                                <label>Quantity:</label>
                                <input class="form-control" type="text" id="quantity"/>
                            </div>
                            <div class="modal-footer">
                                <button id="add-to-order-btn" type="button" class="btn btn-sm btn-outline-secondary">Order</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div id="comment" class="form-group mx-sm-3 mb-2">
                        <h4>Notes:</h4>
                        <div id="textarea">
                            <textarea id="textarea-field" class="form-control" type="text" rows="4" cols="30" placeholder="Make a note..."></textarea>
                            <button id="textarea-btn" class="btn btn-sm btn-inline-secondary">Done!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="container-fluid">
            <div class="row" id="comment-box"></div>
        </div>
        <br> 
        <br> 
    </main>`;
    }

    async after_render() {

        const User = sessionStorage.getItem('username');
        const apiUser = `http://127.0.0.1:8000/users/${User}`;
        const result = await fetch(apiUser);
        const UserData = await result.json();

        fetch(`http://127.0.0.1:8000/details/${this.ProductID}`)

            .then(res => res.json())
            .then(data => {
                const ProdDiv = document.querySelector('#show-prod');
                const PhotoDiv = document.querySelector('.swiper-wrapper');
                const CommentDiv = document.querySelector('#comment-box');
                const showPhoto = []
                const showComments = []

                function ShowProd(data) {
                    return `
                    <h1 class="p-title">
                        <span>${data.title}</span>
                        <span style="font-size:15px;">(${data.item_code})</span>
                    </h1>
                    <hr/>
                    <p class="p-description">${data.description}</p>
                    <div class="profileProducts">
                        <span>Category: ${data.category}</span>
                    </div>
                    <div class="profileProducts">
                        <span>Supplier: ${data.supplier}</span>
                    </div>
                    <div class="profileProducts">
                        <span>Registered ID: ${UserData.first_name}</span>
                    </div>
                    <div class="profileProducts">
                        <span>Registered: ${moment(data.created).format('DD/MM/YYYY')}</span>
                    </div>`
                }

                ProdDiv.innerHTML = ShowProd(data)


                // Get photos of data throught fetch
                for (let photo of data.photos) {
                    showPhoto.push(photo.image.full_size)
                };

                for (let i = 0; i < showPhoto.length; i++) {
                    PhotoDiv.innerHTML += `<img style="width: 500px; height:500px" id="prod-img" class="swiper-slide" src="http://127.0.0.1:8000${showPhoto[i]}">`
                };

                // Get Remarks of data throught fetch

                for (let comments of data.comments) {
                    showComments.push(comments)
                }

                for (let i = 0; i < showComments.length; i++) {
                    CommentDiv.innerHTML += `
                    <div class="col-6 col-sm-3">
                        <ul class="ul-note">
                            <li id="comment-box" class="li-note">
                                <div class="a-note">
                                    <h2 class="h2-note">${UserData.first_name}</h2>
                                    <p class="p-note">${moment(showComments[i].created).format('DD/MM/YYYY')}</p>
                                    <p class="box-note" id="${showComments[i].id}" contenteditable>${showComments[i].content}</p>
                                    <button type="submit" class="btn btn-link btn-sm btn-note-${showComments[i].id}" id="submit" style="display: none;">Save</button>
                                </div>
                            </li>
                        </ul>
                    </div>`
                }
            })

        // Add to Order
        const apiUrl = `http://127.0.0.1:8000/edit/${this.ProductID}`;
        const resp = await fetch(apiUrl);
        const data = await resp.json();
        const items = data;

        document.querySelector('#add-to-order-btn').addEventListener('click', (e) => {
            e.preventDefault()

            let qty = document.querySelector('#quantity').value
            let job = document.querySelector('#job').value
            let description = items.title;
            let code = items.item_code;
            let supplier = items.supplier

            fetch(`http://127.0.0.1:8000/orders/`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "qty": qty,
                    "job_number": job,
                    "description": description,
                    "code": code,
                    "supplier": supplier
                }),
            }).then(result => result.json())
                .then(response => {
                    window.location.href = 'http://127.0.0.1:3000/orders';
                })

        });

        // Swiper JS
        var swiper = new Swiper(".mySwiper", {
            pagination: {
                el: ".swiper-pagination",
            },
        });


        // Remarks Post


        document.querySelector('#textarea-btn').addEventListener('click', (e) => {
            e.preventDefault()

            const comment = document.querySelector('#textarea-field').value;

            fetch('http://127.0.0.1:8000/comment/',
                {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "user": UserData.id,
                        "products": this.ProductID,
                        "content": comment
                    })
                }).then(res => res.json())
                .then(response => {
                    window.location.reload()
                })
        });


        // Edit Note

        const note = {}

        document.querySelector('#comment-box').addEventListener('click', (e) => {

            e.preventDefault()

            let product_id = this.ProductID;
            let id = e.target.id;
            let content = e.target.innerHTML;

            let box = document.getElementsByClassName("box-note");
            let save = document.querySelector(`.btn-note-${id}`);

            if (e.target.className === "box-note") {
                for (let i = 0; i < box.length; i++) {
                    if (box[i].id == id) {
                        save.style.display = "block";
                    }
                }
            };


            if (e.target.className !== "box-note") {
                for (let i = 0; i < box.length; i++) {
                    let save = document.querySelector(`.btn-note-${box[i].id}`);
                    save.style.display = "none";
                }
            };

            note["id"] = id
            note["content"] = content
            note["product_id"] = product_id

            document.querySelector(`.btn-note-${id}`).addEventListener('click', (e) => {

                e.preventDefault()

                id = note["id"];
                content = note["content"];
                product_id = note["product_id"];

                submit(id, content, product_id);

            }, false);

        });

        function submit(id, content, product_id) {

            fetch(`http://127.0.0.1:8000/comment/${id}`, {
                method: "put",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "products": product_id,
                    "content": content
                }),
            }).then(res => res.json())
                .then(response => {
                    console.log(response)
                });

        };



    }
}