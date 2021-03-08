import { PhotographerClass } from "../classes/photographers.js";

function createHomePagePhotographers(photographersArray) {
  
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
}

function createSoloPagePhotographers(photographersArray) {
  
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
        ph.createPhotographerBanner()


}
}


export { createHomePagePhotographers, createSoloPagePhotographers }