import Dashboard from "./views/Dashboard.js";
import Orders from "./views/Orders.js";
import Products from "./views/Products.js";
import Details from "./views/Details.js";
import SearchBar from "./views/SearchBar.js";
import Editem from "./views/Editem.js";


const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    try {
        const values = match.result.slice(1);
        const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

        return Object.fromEntries(keys.map((key, i) => {
            return [key, values[i]];
        }));

    } catch (err) {
        window.location.href = "/dashboard"
    }
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "", view: SearchBar },
        { path: "/dashboard", view: Dashboard },
        { path: "/orders", view: Orders },
        { path: "/products", view: Products },
        { path: "/products/details/:id", view: Details },
        { path: "/edit/:id", view: Editem }
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0].path,
            result: [location.pathname]
        };
    }


    const view = new match.route.view(getParams(match));


    document.querySelector("#app").innerHTML = await view.getHtml();
    view.after_render();

    //Get User Details
    const User = sessionStorage.getItem('username');
    const apiUser = `http://127.0.0.1:8000/users/${User}`;
    const resp = await fetch(apiUser);
    const UserData = await resp.json();

    document.querySelector('#user-title').innerHTML = `Welcome <br><br> ${UserData.first_name} ${UserData.last_name}`;
    
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});



