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
                    <div id="comment" class="form-group mx-sm-3 mb-2"><hr/>
                        <label><h4>Notes:</h4></label>
                        <div class="textarea">
                            <textarea id="textarea-field" class="form-control" type="text" rows="4" cols="50"></textarea>
                            <button id="textarea-btn" class="btn btn-sm btn-outline-secondary">Done!</button>
                        </div
                    </div>
                </div>
            </div>
        </div>
        <hr/>   
        <div class="container">
            <div class="row row-cols-4" id="comment-box"></div>
        </div> 
     
    </main>`;
    }

    async after_render() {

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
                        <span>Registered by: ${data.user_creator}</span>
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
                    PhotoDiv.innerHTML += `<img style="width: 500px; height:500px" class="swiper-slide" src="http://127.0.0.1:8000${showPhoto[i]}">`
                };

                // Get Remarks of data throught fetch

                for (let comments of data.comments) {
                    showComments.push(comments)
                }

                for (let i = 0; i < showComments.length; i++) {
                    CommentDiv.innerHTML += `
                            <div class="col">
                                <ul class="ul-note">
                                    <li id="comment-box" class="li-note">
                                        <div class="a-note">
                                            <h2 class="h2-note">${showComments[i].user}</h2>
                                            <p class="p-note">${moment(showComments[i].created).format('DD/MM/YYYY')}</p>
                                            <p class="box-note" id="${showComments[i].id}" contenteditable>${showComments[i].content}</p>
                                            <button type="submit" class="btn btn-link btn-sm btn-note-${showComments[i].id}" id="submit" style="display: none;">Save</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>`
                }
            })





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
                        "products": this.ProductID,
                        "content": comment
                    })
                })
        });


        // Edit Note




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
            }


            if (e.target.className !== "box-note") {
                for (let i = 0; i < box.length; i++) {
                    let save = document.querySelector(`.btn-note-${box[i].id}`);
                    save.style.display = "none";
                }
            }

            document.querySelector(`.btn-note-${id}`).addEventListener('click', (e) => {

                e.preventDefault()

                console.log(content)
                submit(id, content, product_id);

            }, false);

        }, {});

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
                })

        }



    }
}





/*

if (e.target.className === "box-note") {
    for (let i = 0; i < box.length; i++) {
        if (box[i].id == id) {
            console.log(id)
            console.log(content)
            document.getElementById(id)
            console.log(document.querySelector(`.btn-note-${id}`).style.display = 'block');
          
            
        }
    }

}

if (e.target.className !== "box-note") {
    for (let i = 0; i < box.length; i++) {
        document.querySelector(`.btn-note-${box[i].id}`).style.display = 'none';
    }
} */