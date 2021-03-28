import { Media } from "../classes/medias.js";

export const prepareLightBox = [];

/**
 * Create new media instances of Media class for each media
 * Prepare the medias for the lightBox Modal
 * @param mediaArray
 */

function createMedias(mediaArray) {
    let i = 0;

    // counts total likes
    let totalLikes = countTotalLikes(mediaArray);

    // Init the div where photos are displayed and create new photos,
    let photoFeed = document.getElementById("photoFeed");
    photoFeed.innerHTML = "";
    for (let media of mediaArray) {
        media = new Media(
            media.id,
            media.photographerId,
            media.image ? media.image : null,
            media.video ? media.video : null,
            media.tags,
            media.likes,
            media.date,
            media.price,
            totalLikes
        );
        media.createMediaView();
        let mediaToLightBox = {
            order: i,
            id: media.id,
            image: media.image ? media.image : null,
            video: media.video ? media.video : null,
            photographerId: media.photographerId,
        };
        prepareLightBox.push(mediaToLightBox);
        i++;
    }
}

/**
 * Count the total of likes among all photographer's picture
 * @param mediaArray an of medias
 */
function countTotalLikes(mediaArray) {
    let totalLikes = 0;
    for (let media of mediaArray) {
        totalLikes = totalLikes + parseInt(media.likes);
    }
    return totalLikes;
}

export { createMedias };
