import { Photographer } from "../classes/photographers.js";

function createPhotographers(photographersArray) {

    for (let ph of photographersArray) {
        ph = new Photographer(
            ph.name,
            ph.id,
            ph.city,
            ph.country,
            ph.tags,
            ph.tagline,
            ph.price,
            ph.portrait
            )
        ph.createAView()
    }

}

export { createPhotographers }