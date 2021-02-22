import { PhotographerClass } from "../classes/photographers.js";

function createPhotographers(photographersArray) {
    if (photographersArray.length > 1) {
        for (let ph of photographersArray) {
            ph = new PhotographerClass(
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
    } else {
        let ph = photographersArray[0]
        ph = new PhotographerClass(
            ph.name,
            ph.id,
            ph.city,
            ph.country,
            ph.tags,
            ph.tagline,
            ph.price,
            ph.portrait
        )
        ph.createPhotographerBanner()

    }
}

export { createPhotographers }