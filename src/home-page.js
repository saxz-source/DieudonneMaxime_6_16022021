import { createPhotographers } from "./functions/create-photographers.js";
import { makeRequest } from "./functions/httpRequest.js";
import { handleTagLinks } from "./functions/links-handler.js"


makeRequest("get", "src/bdd/photographers.json")
    .then((r) => {
        let displayedPhotographers = r.photographers
        console.log(displayedPhotographers)
        let mainOrSolo = "main"
        createPhotographers(displayedPhotographers, mainOrSolo)
        handleTagLinks(displayedPhotographers)
    })








