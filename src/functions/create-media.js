import { Media } from "../classes/medias.js"



function createMedias(mediaArray) {
    for (let media of mediaArray) {
        media = new Media(
            media.id,
            media.photographerId,
            media.image,
            media.tags,
            media.likes,
            media.date,
            media.price
        )
        media.createMediaView()
    }
}

export {createMedias}