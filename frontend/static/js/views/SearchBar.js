import AbstractView from "./AbstractView.js"

export default class extends AbstractView {
    constructor(params) {
        super(params);
    }
}

fetch(`http://127.0.0.1:8000/products/`)
    .then(res => res.json())
    .then(result => {
        let DropDown = document.querySelector(".dropdown-content");
        let DropData = document.querySelector("#myDropdown");
        const Search = document.querySelector('#searchBar');
        
        
        for( let i=0; i < result.length; i++) {
            DropDown.innerHTML += `
            <a id="get-${result[i].id}" href="">${result[i].title}</a>`
        }

        Search.addEventListener('keyup', () => {
            DropDown.classList.toggle("show");
            var filter = Search.value.toUpperCase();
            Searching(filter)
        })

        function Searching(e) {
            
            var a, i, txtValue;
            
            a = DropData.getElementsByTagName("a");
            for (i = 0; i < a.length; i++) {
                txtValue = a[i].textContent || a[i].innerText;
                if (txtValue.toUpperCase().indexOf(e) > -1) {
                    a[i].style.display = "";
                    console.log(a[i])
                } else {
                    a[i].style.display = "none";
                }
            }
        }
    })


