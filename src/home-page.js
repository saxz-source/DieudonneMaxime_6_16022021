import { createPhotographers } from "./functions/create-photographers.js";
import { makeRequest } from "./functions/httpRequest.js";





makeRequest("get", "src/bdd/photographers.json")
    .then((r) => {
        console.log(r.photographers)
 

        createPhotographers(r.photographers)
        
    }) 