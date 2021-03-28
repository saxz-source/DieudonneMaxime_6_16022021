import { PhotographerClass } from "../classes/photographers.js";

/**
 * Create a new instance of PhotographerClass class for each photographers
 * @param photographersArray an array of all photographers objects
 * @param  mainOrSolo determines the class method to trigger
 */
function createPhotographers(photographersArray, mainOrSolo) {
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
        );
        if (mainOrSolo === "main") ph.createAView();
        if (mainOrSolo === "solo") ph.createPhotographerBanner();
    }
}

export { createPhotographers };
