import { createPhotographers } from "./functions/create-photographers.js";
import { makeRequest } from "./functions/httpRequest.js";
import { handleTagLinks } from "./functions/links-handler.js"


makeRequest("get", "src/bdd/photographers.json")
    .then((r) => {
        let displayedPhotographers = r.photographers
        console.log(displayedPhotographers)
        createPhotographers(displayedPhotographers)
        handleTagLinks(displayedPhotographers)
    })








