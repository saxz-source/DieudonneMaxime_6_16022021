import { createPhotographers } from "./functions/create-photographers.js";
import { makeRequest } from "./functions/httpRequest.js";
import { handleTagLinks } from "./functions/links-handler.js";


/**
 * Get photographers from photographers bdd (json file)
 */
makeRequest("get", "src/bdd/photographers.json").then((r) => {
    let displayedPhotographers = r.photographers;
    // Call a function that will make each photographer as an instance of Photographer
    createPhotographers(displayedPhotographers, "main");
    // Call a function that will shape and configure tag links.
    handleTagLinks(displayedPhotographers);
});


// Handle the display of the top link
let scrollLink = document.querySelector(".goContent");
window.addEventListener("scroll", function () {
    if (window.pageYOffset > 50) {
        scrollLink.style.display = "initial";
    } else {
        scrollLink.style.display = "none";
    }
});

// Handle the scroll when click on the top link
scrollLink.addEventListener("click", function(){
    document.documentElement.scrollTop = 0;
})
