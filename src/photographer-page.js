import { createPhotographers } from "./functions/create-photographers.js"
import {createMedias} from "./functions/create-media.js"
import { makeRequest } from "./functions/httpRequest.js"



let params = (new URL(document.location)).searchParams;
let phId = params.get('id')
console.log(phId)


makeRequest("get", "src/bdd/photographers.json")
    .then((r) => {
        let thePhotographer = r.photographers.filter(phot => phot.id == phId)
        createPhotographers(thePhotographer)
    })


makeRequest("get", "src/bdd/photos.json")
    .then((r) => {
        console.log(r)
        let filteredMedias = r.media.filter(med => med.photographerId == phId)
        console.log(filteredMedias)
        createMedias(filteredMedias)
    })