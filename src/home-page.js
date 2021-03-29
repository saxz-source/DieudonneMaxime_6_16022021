import { createPhotographers } from "./functions/create-photographers.js";
import { makeRequest } from "./functions/httpRequest.js";
import { handleTagLinks } from "./functions/links-handler.js";
import { handleScrollLink } from "./functions/handleScrollLink.js";

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

handleScrollLink();
